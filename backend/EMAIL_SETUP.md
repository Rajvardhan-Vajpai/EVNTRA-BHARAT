# EMAIL SETUP GUIDE FOR CROWDSAFE

## Step 1: Enable Gmail SMTP (Recommended - Free)

### Option A: Using Gmail (Easiest)
1. Go to https://myaccount.google.com/
2. Click "Security" in the left menu
3. Enable "2-Step Verification" (if not already enabled)
4. Go to "App passwords" (only available if 2FA is enabled)
5. Select "Mail" and "Windows Computer"
6. Google will generate a 16-character password
7. Copy this password

### Step 2: Update .env File

Edit `c:\Users\hp\OneDrive\Desktop\New folder\backend\.env`:

```env
# Email Configuration (Gmail SMTP)
EMAIL_SMTP_SERVER=smtp.gmail.com
EMAIL_SMTP_PORT=587
EMAIL_SENDER=your_gmail@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
ENABLE_EMAIL=True

# App Configuration
API_BASE_URL=http://localhost:8000
```

**Note:** The password has spaces - this is normal! Include the spaces exactly as Gmail provided.

### Step 3: Test Email Configuration

Run the test script:
```powershell
cd "c:\Users\hp\OneDrive\Desktop\New folder\backend"
python test_email.py
```

You should receive a test email within seconds.

---

## Step 4: Update HTML Form to Collect Email

The registration form needs to collect email addresses. Here's what needs to be added:

### In the HTML form, add an email field:
```html
<div>
  <label for="email">Email Address *</label>
  <input type="email" id="email" required />
</div>
```

### When registering, send the email:
```javascript
const email = document.getElementById('email').value;
// After successful registration, send email:
fetch('http://localhost:8000/api/send-email/' + visitor_id + '/' + email, {
  method: 'POST'
})
```

---

## New Email Endpoints

### Send Test Email
```
POST /api/test-email/{email}
Example: POST /api/test-email/user@gmail.com
```

### Send Registration Email
```
POST /api/send-email/{visitor_id}/{email}
Example: POST /api/send-email/VS27CB97B723D9/user@gmail.com
```

### Get QR Code
```
GET /api/visitor/{visitor_id}/qrcode
Example: GET /api/visitor/VS27CB97B723D9/qrcode
```

---

## Email Content

When a visitor registers and provides their email, they will receive:

📧 **Email Subject:** CrowdSafe Registration Confirmation - Visitor ID: VS27CB97B723D9

📧 **Email includes:**
- Welcome message
- Unique Visitor ID (prominently displayed)
- QR Code URL (clickable link)
- Instructions on how to use the QR code
- Privacy notice

---

## Troubleshooting

### ❌ "401 Unauthorized"
- Check if app password is correct
- Make sure you're using app password, not regular Gmail password
- Ensure 2FA is enabled

### ❌ "Failed to send email"
- Check EMAIL_SENDER and EMAIL_PASSWORD are correct
- Try sending a test email first
- Check firewall isn't blocking SMTP port 587

### ❌ "Gmail account says 'Less secure app'"
- Use App Passwords instead of regular password
- Or enable "Less secure app access" in Google Account settings

---

## Alternative Email Services

You can also use:
- **Outlook/Hotmail:** smtp.office365.com:587
- **Yahoo Mail:** smtp.mail.yahoo.com:587 (requires app password)
- **SendGrid:** smtp.sendgrid.net:587
- **Mailgun:** smtp.mailgun.org:587

---

## Testing Current Setup

Current status: ✅ Email service is ready
- Email is currently: **DISABLED** (set to False in .env)
- Once you configure Gmail above, set `ENABLE_EMAIL=True`
- Restart the backend server
- Start sending registration emails!

---

For questions or issues, check the logs at: `http://localhost:8000/docs`
