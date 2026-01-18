# 🛒 Full-Stack E-commerce API with Stripe Integration

A robust **Node.js + Express** backend for an E-commerce platform, featuring secure authentication, product management, and a complete **Stripe payment lifecycle**.

---

## 🚀 Features

- 🔐 **Secure Authentication**  
  JWT-based login & registration with **HTTP-only cookie** stored tokens.

- 🛡️ **Role-Based Access Control (RBAC)**  
  Protected routes for **Users** and **Admins**.

- 📦 **Product Management**  
  Full **CRUD** operations for products.

- 🧾 **Order System**  
  Seamless order placement with automatic order status tracking.

- 💳 **Stripe Payment Gateway**  
  Real-time payment processing using **Stripe Checkout**.

- 🔔 **Automated Webhooks**  
  Instant database updates on successful payment  
  (`status: pending → paid`).

- ⚠️ **Centralized Error Handling**  
  Clean, consistent API error responses via middleware.

---

## 🛠️ Tech Stack

| Category | Technology |
|--------|------------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB (Native Driver) |
| Payments | Stripe API & Stripe CLI |
| Security | JWT, Bcrypt, Cookie-parser, CORS |

---

## 📁 Project Structure

```plaintext
src/
├── config/             # Database & environment configurations
├── middleware/         # Auth & global error handling
├── modules/
│   ├── auth/           # Login & registration logic
│   ├── user/           # User profile management
│   ├── product/        # Product CRUD operations
│   ├── order/          # Order placement & history
│   └── payment/        # Stripe Checkout & webhook handling
└── app.js              # Express app setup & middleware ordering
```
## ⚙️ Setup Instructions

### 1️⃣ Prerequisites

Before getting started, make sure you have the following installed:

- **Node.js** (LTS version recommended)  
  👉 https://nodejs.org/

- **Stripe CLI** (required for local webhook testing)  
  👉 https://stripe.com/docs/stripe-cli

---

### 2️⃣ Environment Variables

Create a `.env` file in the **root directory** of your project and add the following variables:

```env
NODE_ENV=development
PORT=3000

# Stripe Keys
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx

# App URL
CLIENT_URL=http://localhost:3000PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...  # obtained via stripe listen
CLIENT_URL=http://localhost:5173
```

### 3️⃣ Installation & Running the Server
```
npm install
npm run dev
```

## 💳 Stripe Payment Flow (Step-by-Step)

### 1️⃣ Order Creation

- Client sends a request to create an order
- Server saves the order in **MongoDB** with:
  - `userId`
  - `items`
  - `amount`
  - `currency`
  - `status: "pending"`
  - `paymentIntentId: null`

---

### 2️⃣ Create Stripe Payment Intent

- Server creates a **PaymentIntent** using Stripe
- Amount is sent in the **smallest currency unit** (e.g. cents)

```json
{ "status": "pending" }
```

## 💳 Stripe Checkout Payment Flow

### 2️⃣ Stripe Checkout Session

- **Order Controller** calls the **Payment Service**
- Payment Service creates a **Stripe Checkout Session**

```yaml
4242 4242 4242 4242
```

### 5️⃣ Webhook Notification

- After payment completion, **Stripe sends a POST request** to:
```
/api/payment/webhook
```


- This event is sent **server-to-server**, making it secure and reliable

---

### 6️⃣ Webhook Verification

- Server verifies the webhook event using:
  - `express.raw()`
  - `STRIPE_WEBHOOK_SECRET`


### 7️⃣ Database Update

- On event: `checkout.session.completed`
- Server finds the related order using **metadata** (e.g. `orderId`)
- Order status is updated to:

```json
{
  "paymentStatus": "completed"
}
```

## 🧪 Local Testing with Stripe CLI

### 1️⃣ Login to Stripe

```bash
stripe login
```

### 2️⃣ Start Webhook Tunnel

Use Stripe CLI to forward webhook events to your local server:

```bash
stripe listen --forward-to localhost:5000/api/payment/webhook
```

### 3️⃣ Configure Webhook Secret

- Copy the **Webhook Signing Secret** shown in the Stripe CLI output
- Paste it into your `.env` file:

```env
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 4️⃣ Restart Server & Test Payment

- Restart your backend server to load the updated environment variables
- Create a new order from the client
- Complete a test payment using Stripe Checkout 🎉

---

## ✅ Status Lifecycle

```text
pending → completed
```


## 📌 Notes

- Stripe webhooks require raw body parsing
- Always place the webhook route before `express.json()`
- Never expose Stripe secret keys on the frontend


