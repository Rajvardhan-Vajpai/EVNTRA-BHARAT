# PAYMENT SETUP GUIDE FOR CROWDSAFE (Razorpay)

## What changed

Registration is now a two-step, payment-gated flow:

1. `POST /api/payment/create-order` - frontend sends the filled-in form, backend
   creates a Razorpay order and stores the form data against it. No visitor ID
   exists yet.
2. Razorpay Checkout opens in the browser, visitor pays.
3. `POST /api/payment/verify` - frontend sends back Razorpay's response, backend
   verifies the signature, and **only then** creates the visitor record, issues
   the real visitor ID, and emails it.
4. `POST /api/payment/webhook` - optional safety net so a visitor record still
   gets created even if the browser never reaches step 3 (closed tab, crash,
   etc.) after a successful payment.

There is no "free" registration path anymore - `/api/register` has been
removed. (This means `test_sms.py` and `full_system_test.py`, which posted
directly to that endpoint, will need updating before they'll work again. They
were left out of this drop since they need to be rewritten against the new
flow - happy to do that if you want them back.)

## Step 1: Get Razorpay API keys

1. Sign up / log in at https://dashboard.razorpay.com
2. Go to **Settings -> API Keys**
3. Generate a **Test key** to develop with (starts with `rzp_test_`)
4. Copy the Key ID and Key Secret

## Step 2: Update `.env`

```env
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxx
RAZORPAY_CURRENCY=INR
REGISTRATION_FEE_PAISE=10000   # ₹100.00 - change to whatever your fee is
```

## Step 3: Migrate the existing database

Your `crowdsafe.db` already has 7 visitors from before, in a table that
doesn't have the new `email` / `payment_id` / `amount_paid` columns yet.
Run this once, from the `backend/` folder:

```bash
python migrate_db.py
```

This adds the missing columns without touching your existing rows. The new
`payment_orders` table is created automatically the next time you start the
server (it's a new table, not an alteration of an existing one).

## Step 4: Install the new dependency

```bash
pip install -r requirements.txt
```

(adds `razorpay`, and `twilio` which was missing before despite `sms_service.py`
needing it)

## Step 5: Test with Razorpay's test cards

With test keys active, use these on the Checkout popup - no real money moves:

- Card: `4111 1111 1111 1111`, any future expiry, any CVV
- UPI (test mode): use `success@razorpay` to simulate a successful payment

## Step 6 (optional, for production): set up the webhook

1. Deploy the backend somewhere with a public URL (Razorpay can't reach
   `localhost`)
2. In Razorpay Dashboard -> **Settings -> Webhooks**, add:
   `https://yourdomain.com/api/payment/webhook`
3. Subscribe to the `payment.captured` event
4. Copy the webhook secret Razorpay shows you into `.env` as
   `RAZORPAY_WEBHOOK_SECRET`

## Step 7: Go live

Once you're happy with testing, swap `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET`
for your **Live** keys (Razorpay requires KYC/activation first) and update
`registration.html`'s checkout.js script tag reference if you've self-hosted
it - otherwise no frontend changes are needed, the keys are fetched from
`/api/payment/config` at runtime.

---

For questions, check Razorpay's docs: https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/
