require("dotenv").config();
const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const hasKeys = process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET;
const razorpay = hasKeys ? new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
}) : null;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/config", (_req, res) => {
  res.json({ keyId: process.env.RAZORPAY_KEY_ID || null, ready: Boolean(razorpay) });
});

app.post("/api/create-order", async (_req, res) => {
  if (!razorpay) return res.status(503).json({ error: "Payment gateway is not configured yet." });
  try {
    const order = await razorpay.orders.create({
      amount: 9900,
      currency: "INR",
      receipt: "luckytech_" + Date.now(),
      notes: { product: "Lucky Tech WhatsApp Membership" }
    });
    res.json({ orderId: order.id, amount: order.amount, currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    console.error("Order creation failed:", err.message);
    res.status(500).json({ error: "Could not create payment order." });
  }
});

app.post("/api/verify-payment", (req, res) => {
  if (!process.env.RAZORPAY_KEY_SECRET) return res.status(503).json({ error: "Payment gateway is not configured." });
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body || {};
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature)
    return res.status(400).json({ error: "Missing payment verification details." });

  const expected = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(String(razorpay_signature));
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b))
    return res.status(400).json({ error: "Payment signature verification failed." });

  const invite = process.env.WHATSAPP_INVITE_URL;
  if (!invite || !invite.startsWith("https://chat.whatsapp.com/"))
    return res.status(503).json({ error: "Payment verified, but group access is not configured. Contact support." });

  res.json({ verified: true, joinUrl: invite });
});

app.listen(PORT, () => console.log(`Lucky Tech running at http://localhost:${PORT}`));
