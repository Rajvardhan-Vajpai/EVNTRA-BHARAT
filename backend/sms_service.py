import os
import io
import logging

import qrcode
from dotenv import load_dotenv

try:
    from twilio.rest import Client
except ImportError:
    Client = None

load_dotenv()

logger = logging.getLogger(__name__)


class SMSService:
    """Sends visitor confirmations via WhatsApp (Twilio's WhatsApp API), not plain SMS.

    Twilio's WhatsApp Sandbox number is +14155238886 - that's what should be in
    TWILIO_PHONE_NUMBER for testing. Each recipient phone number must first send
    the sandbox's "join <code>" message to that number once (from their own
    WhatsApp) before they can receive sandbox messages - this is a Twilio
    requirement, not something this code can do for them. For production,
    you'd register a real WhatsApp Business number with Twilio instead.

    Same .env vars as before (ENABLE_SMS, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN,
    TWILIO_PHONE_NUMBER) - only the underlying channel changed, not the config.
    """

    def __init__(self):
        self.account_sid = os.getenv("TWILIO_ACCOUNT_SID")
        self.auth_token = os.getenv("TWILIO_AUTH_TOKEN")
        self.phone_number = os.getenv("TWILIO_PHONE_NUMBER")
        self.api_base_url = os.getenv("API_BASE_URL", "http://localhost:8000")
        self.enable_sms = os.getenv("ENABLE_SMS", "False").lower() == "true"

        if self.enable_sms and Client is None:
            logger.warning("WhatsApp enabled but the twilio package is not installed")
            self.enable_sms = False

        if self.enable_sms and (not self.account_sid or not self.auth_token):
            logger.warning("WhatsApp enabled but Twilio credentials not configured")
            self.enable_sms = False

        if self.enable_sms:
            self.client = Client(self.account_sid, self.auth_token)

    def _normalize_number(self, phone_number: str) -> str:
        """Ensure the number is in E.164 format. Bare 10-digit numbers are
        assumed to be Indian mobile numbers and get +91 prepended."""
        number = phone_number.strip().replace(" ", "").replace("-", "")
        if not number.startswith("+"):
            number = "+91" + number if len(number) == 10 else "+" + number
        return number

    def generate_qr_code(self, visitor_id: str) -> str:
        """Generate a QR code for the visitor ID and return as a base64 data URL."""
        try:
            qr_url = f"{self.api_base_url}/visitor/{visitor_id}"
            qr = qrcode.QRCode(version=1, error_correction=qrcode.constants.ERROR_CORRECT_L, box_size=10, border=4)
            qr.add_data(qr_url)
            qr.make(fit=True)
            img = qr.make_image(fill_color="black", back_color="white")

            import base64
            buffered = io.BytesIO()
            img.save(buffered, format="PNG")
            img_base64 = base64.b64encode(buffered.getvalue()).decode()
            return f"data:image/png;base64,{img_base64}"
        except Exception as e:
            logger.error(f"Error generating QR code: {e}")
            return None

    def send_registration_sms(self, phone_number: str, first_name: str, visitor_id: str) -> bool:
        """Send a WhatsApp confirmation for a single visitor."""
        return self.send_group_registration_sms(phone_number, first_name, [
            {"visitor_id": visitor_id, "first_name": first_name}
        ])

    def send_group_registration_sms(self, phone_number: str, primary_first_name: str, visitors: list) -> bool:
        """
        Send ONE WhatsApp message covering every member of a group registration.
        `visitors` is a list of dicts: [{"visitor_id": ..., "first_name": ...}, ...]
        Returns True if successful (or if WhatsApp is disabled, since that's not an error), False on a real failure.
        """
        if not self.enable_sms:
            ids = ", ".join(v["visitor_id"] for v in visitors)
            logger.info(f"WhatsApp disabled. Would send to {phone_number}: Visitor ID(s) {ids}")
            return True

        try:
            normalized = self._normalize_number(phone_number)
            id_lines = "\n".join(f"{v['first_name']}: {v['visitor_id']}" for v in visitors)
            qr_link = f"{self.api_base_url}/visitor/{visitors[0]['visitor_id']}"

            if len(visitors) == 1:
                message = (
                    f"Hello {primary_first_name}! 🎉\n\n"
                    f"Welcome to Kumbh Mela 2025!\n\n"
                    f"Your Visitor ID: {visitors[0]['visitor_id']}\n"
                    f"QR Code: {qr_link}\n\n"
                    f"Keep this ID safe. Skip the queue at the gate!"
                )
            else:
                message = (
                    f"Hello {primary_first_name}! 🎉\n\n"
                    f"Welcome to Kumbh Mela 2025! Your group of {len(visitors)} is registered:\n\n"
                    f"{id_lines}\n\n"
                    f"Check your email for each person's QR code. Keep these IDs safe!"
                )

            msg = self.client.messages.create(
                body=message,
                from_=f"whatsapp:{self.phone_number}",
                to=f"whatsapp:{normalized}",
            )

            logger.info(f"Group WhatsApp message sent to {normalized} (SID: {msg.sid}, {len(visitors)} visitor IDs)")
            return True
        except Exception as e:
            logger.error(f"Error sending group WhatsApp message to {phone_number}: {e}")
            return False

    def send_test_sms(self, phone_number: str) -> bool:
        """Send a test WhatsApp message to verify Twilio configuration."""
        if not self.enable_sms:
            logger.warning("WhatsApp is not enabled")
            return False

        try:
            normalized = self._normalize_number(phone_number)
            msg = self.client.messages.create(
                body="Test message from CrowdSafe. If you received this on WhatsApp, your Twilio setup is correct!",
                from_=f"whatsapp:{self.phone_number}",
                to=f"whatsapp:{normalized}",
            )
            logger.info(f"Test WhatsApp message sent successfully (SID: {msg.sid})")
            return True
        except Exception as e:
            logger.error(f"Error sending test WhatsApp message: {e}")
            return False


# Global instance
sms_service = SMSService()
