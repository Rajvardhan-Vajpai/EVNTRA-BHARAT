import os
import hmac
import hashlib
import logging

import razorpay
from razorpay.errors import SignatureVerificationError
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)


class PaymentService:
    """Wraps Razorpay order creation and payment/webhook signature verification.

    Required .env vars:
        RAZORPAY_KEY_ID
        RAZORPAY_KEY_SECRET
        RAZORPAY_WEBHOOK_SECRET   (only needed if you enable the webhook endpoint)
        REGISTRATION_FEE_PAISE    (default 10000 = ₹100.00)
        RAZORPAY_CURRENCY         (default INR)
    """

    def __init__(self):
        self.key_id = os.getenv("RAZORPAY_KEY_ID")
        self.key_secret = os.getenv("RAZORPAY_KEY_SECRET")
        self.webhook_secret = os.getenv("RAZORPAY_WEBHOOK_SECRET")
        self.currency = os.getenv("RAZORPAY_CURRENCY", "INR")
        # Per-visitor fee, in the smallest currency unit (paise for INR): 10000 = ₹100.00 per person.
        # A group of 5 is charged 5x this amount - see main.py's create_order().
        self.fee_per_person_paise = int(os.getenv("REGISTRATION_FEE_PAISE", "10000"))

        if not self.key_id or not self.key_secret:
            logger.warning(
                "Razorpay credentials are not set. "
                "Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in your .env file."
            )
            self.client = None
        else:
            self.client = razorpay.Client(auth=(self.key_id, self.key_secret))

    def create_order(self, amount_paise: int) -> dict:
        """Create a Razorpay order for the given amount (already computed by the caller,
        e.g. fee_per_person_paise * number of group members)."""
        if not self.client:
            raise RuntimeError("Razorpay is not configured")

        return self.client.order.create({
            "amount": amount_paise,
            "currency": self.currency,
            "payment_capture": 1,
        })

    def verify_signature(self, razorpay_order_id: str, razorpay_payment_id: str, razorpay_signature: str) -> bool:
        """Verify the signature returned by Razorpay Checkout after a successful payment."""
        if not self.client:
            return False
        try:
            self.client.utility.verify_payment_signature({
                "razorpay_order_id": razorpay_order_id,
                "razorpay_payment_id": razorpay_payment_id,
                "razorpay_signature": razorpay_signature,
            })
            return True
        except SignatureVerificationError:
            return False

    def verify_webhook_signature(self, body: bytes, signature: str) -> bool:
        """Verify the X-Razorpay-Signature header on an incoming webhook payload."""
        if not self.webhook_secret:
            logger.warning("RAZORPAY_WEBHOOK_SECRET not set; rejecting webhook")
            return False
        expected = hmac.new(self.webhook_secret.encode(), body, hashlib.sha256).hexdigest()
        return hmac.compare_digest(expected, signature)


# Global instance
payment_service = PaymentService()
