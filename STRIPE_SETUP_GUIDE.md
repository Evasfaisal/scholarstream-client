# Stripe Payment Integration Guide - ScholarStream

## ধাপ ১: Stripe Account তৈরি করুন

### 1.1 Stripe এ Sign Up করুন
1. এই লিংকে যান: https://dashboard.stripe.com/register
2. Email, Name, Password দিয়ে account তৈরি করুন
3. Email verify করুন

### 1.2 Dashboard এ Login করুন
- URL: https://dashboard.stripe.com

---

## ধাপ ২: API Keys সংগ্রহ করুন

### 2.1 Test Mode API Keys পান
1. Stripe Dashboard এ login করুন
2. উপরের ডানদিকে **"Test mode"** toggle ON আছে কিনা check করুন
3. Left sidebar থেকে **"Developers"** → **"API keys"** এ ক্লিক করুন
4. দুইটা key দেখবেন:
   - **Publishable key** (starts with `pk_test_...`) - Frontend এ use হবে
   - **Secret key** (starts with `sk_test_...`) - Backend এ use হবে

### 2.2 Keys কপি করুন
```
Publishable key: pk_test_51QdOUuRr5CbjLgNXVg0v1VGx0W8z3GzOZK5P3oQj5wq...
Secret key: sk_test_51QdOUuRr5CbjLgNXVg0v1VGx0W8z3GzOZK5P3oQj5wq...
```

**⚠️ Important:** Secret key কখনো GitHub বা public এ share করবেন না!

---

## ধাপ ৩: Frontend Setup (React)

### 3.1 `.env` file এ Publishable Key add করুন
```env
VITE_API_URL=http://localhost:5000
VITE_STRIPE_PUBLIC_KEY=pk_test_YOUR_ACTUAL_KEY_HERE
```

### 3.2 Packages Already Installed ✅
```json
"@stripe/react-stripe-js": "^5.4.1",
"@stripe/stripe-js": "^8.5.3"
```

### 3.3 Checkout Component Already Ready ✅
File: `src/pages/Checkout.jsx`

---

## ধাপ ৪: Backend Setup (Node.js)

### 4.1 Backend এ Stripe Install করুন
```bash
cd your-backend-folder
npm install stripe
```

### 4.2 Backend `.env` file এ Secret Key add করুন
```env
STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY_HERE
PORT=5000
```

### 4.3 Backend Payment Route তৈরি করুন

**File: `routes/payment.js`** (বা যেখানে payment routes আছে)
```javascript
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create Payment Intent
router.post('/create-payment-intent', async (req, res) => {
    try {
        const { amount, currency, metadata } = req.body;

        // Validate amount
        if (!amount || amount < 50) { // Minimum $0.50
            return res.status(400).json({ error: 'Invalid amount' });
        }

        // Create payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount), // Amount in cents
            currency: currency || 'usd',
            metadata: metadata || {},
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error('Payment Intent Error:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
```

### 4.4 Main Server File এ Route Add করুন

**File: `server.js` or `index.js`**
```javascript
const paymentRoutes = require('./routes/payment');
app.use('/api/payment', paymentRoutes);
```

---

## ধাপ ৫: Testing (Test Mode)

### 5.1 Dev Servers চালু করুন
```bash
# Frontend Terminal
cd c:\project\my-ScholarStream-Assignment-11-client
npm run dev

# Backend Terminal (নতুন terminal)
cd your-backend-folder
npm start
```

### 5.2 Test Card Details ব্যবহার করুন

#### ✅ Successful Payment Test Card:
```
Card Number: 4242 4242 4242 4242
Expiry Date: 12/34 (any future date)
CVC: 123 (any 3 digits)
ZIP: 12345 (any 5 digits)
```

#### ❌ Failed Payment Test Card:
```
Card Number: 4000 0000 0000 0002
Expiry Date: 12/34
CVC: 123
ZIP: 12345
```

#### 🔐 Requires Authentication:
```
Card Number: 4000 0025 0000 3155
Expiry Date: 12/34
CVC: 123
ZIP: 12345
```

### 5.3 Testing Flow:
1. **Browser এ যান:** http://localhost:5173 (বা যেটা আপনার frontend port)
2. **Login** করুন
3. **All Scholarships** page এ যান
4. একটা scholarship select করুন
5. **"Apply"** বা **"Checkout"** button এ click করুন
6. Payment form এ test card details দিন
7. **"Pay"** button click করুন
8. Success page দেখবেন ✅

### 5.4 Browser Console Check করুন:
- Press F12 → Console tab
- Payment API call দেখবেন
- Error থাকলে সেখানে দেখাবে

---

## ধাপ ৬: Verify Payment in Stripe Dashboard

### 6.1 Stripe Dashboard এ Check করুন
1. https://dashboard.stripe.com যান
2. **"Payments"** tab এ click করুন
3. আপনার test payments list দেখবেন
4. প্রতিটা payment এর details, status, amount দেখতে পারবেন

### 6.2 Payment Details:
- Transaction ID
- Amount
- Customer email
- Payment status
- Metadata (scholarshipId, userId, etc.)

---

## ধাপ ৭: Production এ Deploy করার আগে

### 7.1 Stripe Account Activate করুন
1. Stripe Dashboard → **"Activate your account"**
2. Business details fill করুন
3. Bank account add করুন
4. Identity verification complete করুন

### 7.2 Live Mode API Keys ব্যবহার করুন
1. Dashboard এ **"Test mode"** toggle OFF করুন
2. **"Developers"** → **"API keys"** থেকে Live keys copy করুন
3. Production `.env` files update করুন:

**Frontend Production `.env`:**
```env
VITE_API_URL=https://your-backend-domain.com
VITE_STRIPE_PUBLIC_KEY=pk_live_YOUR_LIVE_PUBLISHABLE_KEY
```

**Backend Production `.env`:**
```env
STRIPE_SECRET_KEY=sk_live_YOUR_LIVE_SECRET_KEY
```

### 7.3 Security Checklist:
- ✅ Secret keys শুধু backend এ
- ✅ `.env` files `.gitignore` এ আছে
- ✅ HTTPS enabled (production)
- ✅ CORS properly configured
- ✅ Rate limiting enabled
- ✅ Input validation on backend

---

## ধাপ ৮: Troubleshooting

### Common Issues:

#### ❌ Issue 1: "Invalid API Key"
**Solution:** 
- Check `.env` file এ correct key আছে কিনা
- Test mode তে test key use করছেন কিনা
- Server restart করেছেন কিনা

#### ❌ Issue 2: "Failed to initialize payment"
**Solution:**
- Backend running আছে কিনা check করুন
- Console এ error message দেখুন
- Network tab check করুন (F12 → Network)

#### ❌ Issue 3: "CORS Error"
**Solution:**
Backend এ CORS enable করুন:
```javascript
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
```

#### ❌ Issue 4: "Amount too small"
**Solution:**
Stripe minimum $0.50 (50 cents) লাগে
```javascript
if (amount < 50) {
    return res.status(400).json({ error: 'Amount must be at least $0.50' });
}
```

---

## Payment Flow Diagram

```
┌─────────────┐
│   Student   │
│   (User)    │
└──────┬──────┘
       │
       │ 1. Select Scholarship
       ▼
┌─────────────────────┐
│  Scholarship        │
│  Details Page       │
└──────┬──────────────┘
       │
       │ 2. Click "Apply"
       ▼
┌─────────────────────┐
│  Checkout Page      │
│  - Load Stripe      │
│  - Show Payment Form│
└──────┬──────────────┘
       │
       │ 3. Request Payment Intent
       ▼
┌─────────────────────┐
│   Backend API       │
│   /create-payment-  │
│   intent            │
└──────┬──────────────┘
       │
       │ 4. Call Stripe API
       ▼
┌─────────────────────┐
│   Stripe Server     │
│   - Create Payment  │
│   - Return Secret   │
└──────┬──────────────┘
       │
       │ 5. Return clientSecret
       ▼
┌─────────────────────┐
│  Checkout Form      │
│  - Enter Card Info  │
│  - Click "Pay"      │
└──────┬──────────────┘
       │
       │ 6. Confirm Payment
       ▼
┌─────────────────────┐
│   Stripe Server     │
│   - Process Card    │
│   - Charge Amount   │
└──────┬──────────────┘
       │
       ├── Success ──┐
       │             │
       │             ▼
       │      ┌─────────────────┐
       │      │ Save Application│
       │      │ Status: Paid    │
       │      └────────┬────────┘
       │               │
       │               ▼
       │      ┌─────────────────┐
       │      │  Success Page   │
       │      └─────────────────┘
       │
       └── Failed ───┐
                     │
                     ▼
              ┌─────────────────┐
              │ Save Application│
              │ Status: Unpaid  │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │   Failed Page   │
              └─────────────────┘
```

---

## Quick Reference - Test Cards

| Purpose | Card Number | Expiry | CVC |
|---------|-------------|--------|-----|
| ✅ Success | 4242 4242 4242 4242 | 12/34 | 123 |
| ❌ Declined | 4000 0000 0000 0002 | 12/34 | 123 |
| 🔐 Authentication | 4000 0025 0000 3155 | 12/34 | 123 |
| ⚠️ Insufficient Funds | 4000 0000 0000 9995 | 12/34 | 123 |

More test cards: https://stripe.com/docs/testing

---

## Resources

- **Stripe Docs:** https://stripe.com/docs
- **Stripe Dashboard:** https://dashboard.stripe.com
- **Test Cards:** https://stripe.com/docs/testing
- **API Reference:** https://stripe.com/docs/api
- **Support:** https://support.stripe.com

---

## Current Project Status

✅ Frontend Checkout page ready  
✅ Stripe packages installed  
✅ Payment flow implemented  
✅ Success/Failed pages ready  
✅ Test card processing setup  
⏳ Backend endpoint needs implementation  
⏳ Stripe API keys need to be added  

---

**Next Steps:**
1. Stripe account create করুন
2. Test API keys copy করুন
3. `.env` files update করুন
4. Backend payment endpoint implement করুন
5. Dev servers restart করুন
6. Test cards দিয়ে payment test করুন

Good luck! 🚀💳
