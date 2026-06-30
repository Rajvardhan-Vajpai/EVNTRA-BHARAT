# CrowdSafe — Visitor Registration & Management System

A full-stack visitor management platform built with **FastAPI** and **SQLite**. Organizations can register visitors digitally, generate unique IDs and QR codes, and send automated email/SMS confirmations — replacing paper-based sign-in entirely.

---

## Features

- **Electronic Registration** — Web form captures name, email, phone, organization, and visit purpose
- **Unique Visitor IDs** — Auto-generated IDs in the format `VS<alphanumeric>` (e.g. `VS27CB97B723D9`)
- **QR Code Generation** — Unique PNG QR code per visitor, scannable for instant lookup
- **Email Notifications** — Automated confirmation emails via Gmail SMTP with visitor ID and QR link
- **SMS Notifications** — Optional Twilio integration for mobile confirmations
- **REST API** — Full Swagger-documented API at `/docs`
- **Visitor Lookup** — Search by ID, list all visitors, retrieve QR codes

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | FastAPI 0.104.1, Uvicorn 0.24.0 |
| Database | SQLite + SQLAlchemy 2.0.23 |
| Validation | Pydantic 2.5.0 |
| QR Codes | qrcode 7.4.2, Pillow 10.1.0 |
| Email | Gmail SMTP (python-dotenv) |
| SMS | Twilio (optional) |
| Migrations | Alembic 1.13.1 |

---

## Project Structure

```
Crowdsafe-management/
├── registration.html              # Visitor registration frontend
├── .gitignore
└── crowdsafe-backend/
    └── backend/
        ├── main.py                # FastAPI app & route handlers
        ├── database.py            # SQLite setup & session management
        ├── models.py              # Pydantic request/response models
        ├── email_service.py       # Gmail SMTP email sender
        ├── sms_service.py         # Twilio SMS sender
        ├── requirements.txt       # Python dependencies
        ├── EMAIL_SETUP.md         # Email configuration guide
        ├── test_email.py          # Email integration test
        ├── test_sms.py            # SMS integration test
        ├── verify_sms.py          # SMS verification script
        └── full_system_test.py    # Full system test suite
```

> **Note:** `crowdsafe.db` is excluded from version control. It is created automatically on first run.

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Rajvardhan-Vajpai/Crowdsafe-management.git
cd Crowdsafe-management/crowdsafe-backend/backend
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure environment

Create a `.env` file inside `backend/`:

```env
EMAIL_SMTP_SERVER=smtp.gmail.com
EMAIL_SMTP_PORT=587
EMAIL_SENDER=your_email@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
ENABLE_EMAIL=True
```

> For Gmail, generate an **App Password** from your Google account (requires 2-Step Verification).  
> See `EMAIL_SETUP.md` for the full guide.

### 4. Run the server

```bash
python main.py
```

Server starts at `http://localhost:8000`  
API docs available at `http://localhost:8000/docs`

### 5. Open the registration form

Open `registration.html` in your browser, or serve it statically.

---

## API Reference

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/register` | Register a new visitor |
| `GET` | `/api/visitor/{visitor_id}` | Get visitor details by ID |
| `GET` | `/api/visitor/{visitor_id}/qrcode` | Get visitor QR code (base64 PNG) |
| `GET` | `/api/visitors` | List all registered visitors |
| `POST` | `/api/test-email/{email}` | Send a test email |
| `POST` | `/api/send-email/{visitor_id}/{email}` | Send confirmation email |

Full interactive docs at: `http://localhost:8000/docs`

---

## Visitor Flow

```
Visitor fills form → Backend validates input
    → Generates Visitor ID (VS...)
    → Creates QR code
    → Saves to database
    → Sends email confirmation
    → (Optional) Sends SMS
```

---

## SMS Setup (Optional)

1. Create a [Twilio](https://www.twilio.com) account
2. Add your credentials to `twilio.env`
3. SMS confirmations will be sent automatically on registration

---

## Running Tests

```bash
python test_email.py        # Verify email config
python test_sms.py          # Verify SMS config
python full_system_test.py  # Full system validation
```

---

## Deployment

The backend is deployment-ready. Can be hosted on:

- **Docker** — containerize `backend/` with a standard Python image
- **Cloud** — AWS, Azure, GCP, Railway, Render, Heroku
- **VPS** — any Linux server with Python 3.10+

---

## Author

**Rajvardhan Vajpai**  
AI/ML Engineering Student, Lovely Professional University  
[github.com/Rajvardhan-Vajpai](https://github.com/Rajvardhan-Vajpai)
