import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
import logging

load_dotenv()

logger = logging.getLogger(__name__)

class EmailService:
    """Service for sending emails with QR code links"""
    
    def __init__(self):
        self.smtp_server = os.getenv("EMAIL_SMTP_SERVER", "smtp.gmail.com")
        self.smtp_port = int(os.getenv("EMAIL_SMTP_PORT", "587"))
        self.sender_email = os.getenv("EMAIL_SENDER")
        self.sender_password = os.getenv("EMAIL_PASSWORD")
        self.api_base_url = os.getenv("API_BASE_URL", "http://localhost:8000")
        self.enable_email = os.getenv("ENABLE_EMAIL", "False").lower() == "true"
        
        if self.enable_email and (not self.sender_email or not self.sender_password):
            logger.warning("Email enabled but credentials not configured")
            self.enable_email = False
    
    def send_registration_email(self, recipient_email: str, first_name: str, visitor_id: str) -> bool:
        """
        Send registration confirmation email with QR code link
        Returns True if successful, False otherwise
        """
        return self.send_group_registration_email(recipient_email, first_name, [
            {"visitor_id": visitor_id, "first_name": first_name, "last_name": ""}
        ])

    def send_group_registration_email(self, recipient_email: str, primary_first_name: str, visitors: list) -> bool:
        """
        Send ONE confirmation email covering every member of a group registration.
        `visitors` is a list of dicts: [{"visitor_id": ..., "first_name": ..., "last_name": ...}, ...]
        Returns True if successful, False otherwise.
        """
        if not self.enable_email:
            ids = ", ".join(v["visitor_id"] for v in visitors)
            logger.info(f"Email disabled. Would send to {recipient_email}: Visitor ID(s) {ids}")
            return True

        try:
            count = len(visitors)
            subject = (
                f"CrowdSafe Registration Confirmation - Visitor ID: {visitors[0]['visitor_id']}"
                if count == 1
                else f"CrowdSafe Registration Confirmation - {count} Visitor IDs"
            )

            id_rows = ""
            for v in visitors:
                qr_link = f"{self.api_base_url}/visitor/{v['visitor_id']}"
                full_name = f"{v['first_name']} {v.get('last_name', '')}".strip()
                id_rows += f"""
                    <div style="background-color: white; padding: 16px; border-radius: 8px; text-align: center; margin: 14px 0; border: 1px solid #E1F5EE;">
                        <p style="color: #666; margin-bottom: 4px;">{full_name}</p>
                        <h2 style="color: #1D9E75; font-size: 24px; letter-spacing: 2px; margin: 4px 0;">{v['visitor_id']}</h2>
                        <p><a href="{qr_link}" style="color: #0F6E56; font-size: 12px;">{qr_link}</a></p>
                    </div>
                """

            html_content = f"""
            <html>
                <body style="font-family: Arial, sans-serif; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                        <div style="background-color: #085041; color: white; padding: 20px; border-radius: 8px; text-align: center;">
                            <h1>Welcome to Kumbh Mela 2025!</h1>
                            <h2>CrowdSafe Registration Confirmed</h2>
                        </div>

                        <div style="margin: 30px 0; padding: 20px; background-color: #f4f3ef; border-radius: 8px;">
                            <h3>Hello {primary_first_name},</h3>
                            <p>Thank you for registering! Payment received and your group's registration is confirmed.</p>

                            <h4 style="margin-top: 20px;">Your Visitor ID{'s' if count > 1 else ''} ({count}):</h4>
                            {id_rows}

                            <div style="background-color: #E1F5EE; padding: 15px; border-radius: 5px; margin: 20px 0;">
                                <h4>How to use your QR Code:</h4>
                                <ul>
                                    <li>📱 Save or screenshot this email</li>
                                    <li>🎫 Each person shows their own QR code at the gate</li>
                                    <li>⏭️ Skip the queue and enter faster</li>
                                    <li>👥 Stay connected with your group</li>
                                </ul>
                            </div>

                            <p style="margin-top: 30px; color: #999; font-size: 12px;">
                                Your data is used only for visitor safety during this event.
                                It will be deleted 30 days after the event ends.
                            </p>
                        </div>

                        <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
                            <p>CrowdSafe Visitor Management System</p>
                            <p>Kumbh Mela 2025 - Prayagraj</p>
                        </div>
                    </div>
                </body>
            </html>
            """

            msg = MIMEMultipart("alternative")
            msg["Subject"] = subject
            msg["From"] = self.sender_email
            msg["To"] = recipient_email
            msg.attach(MIMEText(html_content, "html"))

            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.starttls()
                server.login(self.sender_email, self.sender_password)
                server.send_message(msg)

            logger.info(f"Group registration email sent to {recipient_email} ({count} visitor IDs)")
            return True

        except Exception as e:
            logger.error(f"Error sending group registration email to {recipient_email}: {e}")
            return False
    
    def send_test_email(self, recipient_email: str) -> bool:
        """Send a test email to verify configuration"""
        if not self.enable_email:
            logger.warning("Email is not enabled")
            return False
        
        try:
            subject = "CrowdSafe Email Test"
            html_content = """
            <html>
                <body style="font-family: Arial, sans-serif; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                        <h2>CrowdSafe Email Configuration Test</h2>
                        <p>✓ If you received this email, the email service is configured correctly!</p>
                        <p>You can now use CrowdSafe for visitor registration with email notifications.</p>
                    </div>
                </body>
            </html>
            """
            
            msg = MIMEMultipart("alternative")
            msg["Subject"] = subject
            msg["From"] = self.sender_email
            msg["To"] = recipient_email
            msg.attach(MIMEText(html_content, "html"))
            
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.starttls()
                server.login(self.sender_email, self.sender_password)
                server.send_message(msg)
            
            logger.info(f"Test email sent to {recipient_email}")
            return True
            
        except Exception as e:
            logger.error(f"Error sending test email: {e}")
            return False

    def send_newsletter_email(self, recipient_email: str) -> bool:
        """Send a welcome email for newsletter subscription"""
        if not self.enable_email:
            logger.info(f"Email disabled. Would send newsletter welcome to {recipient_email}")
            return True
        
        try:
            subject = "Welcome to Eventra Bharat!"
            html_content = """
            <html>
                <body style="font-family: 'Helvetica Neue', Arial, sans-serif; color: #1a1a1a; margin: 0; padding: 0; background-color: #f9f7f4;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #ffffff; border-radius: 8px; margin-top: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                        <div style="text-align: center; margin-bottom: 30px;">
                            <h1 style="color: #7c1f23; font-family: 'Playfair Display', serif; font-size: 32px; margin: 0;">Eventra <span style="color: #cda434;">Bharat</span></h1>
                        </div>
                        <h2 style="font-size: 24px; margin-bottom: 20px; font-weight: 500;">You're successfully subscribed! 🎉</h2>
                        <p style="font-size: 16px; line-height: 1.6; color: #4a4a4a; margin-bottom: 20px;">
                            Thank you for subscribing to our newsletter! We're thrilled to have you on board. 
                            Get ready to discover the finest concerts, heritage walks, festivals, and cultural showcases happening across India.
                        </p>
                        <p style="font-size: 16px; line-height: 1.6; color: #4a4a4a; margin-bottom: 30px;">
                            We'll drop a curated weekly roundup straight into your inbox so you never miss a moment worth showing up for.
                        </p>
                        <div style="text-align: center;">
                            <a href="http://127.0.0.1:3000/html/home.html" style="display: inline-block; padding: 12px 30px; background-color: #7c1f23; color: #ffffff; text-decoration: none; border-radius: 4px; font-weight: 600; letter-spacing: 0.5px;">Explore Experiences</a>
                        </div>
                        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eeeeee; text-align: center; font-size: 12px; color: #999999;">
                            <p>© 2025 Eventra Technologies Pvt. Ltd.</p>
                            <p>You received this email because you subscribed to the Eventra newsletter.</p>
                        </div>
                    </div>
                </body>
            </html>
            """
            
            msg = MIMEMultipart("alternative")
            msg["Subject"] = subject
            msg["From"] = self.sender_email
            msg["To"] = recipient_email
            msg.attach(MIMEText(html_content, "html"))
            
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.starttls()
                server.login(self.sender_email, self.sender_password)
                server.send_message(msg)
            
            logger.info(f"Newsletter email sent to {recipient_email}")
            return True
            
        except Exception as e:
            logger.error(f"Error sending newsletter email: {e}")
            return False

# Global instance
email_service = EmailService()

