import express from "express";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";
import EmailLog from "./models/EmailLog.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("DB error:", err));

// Nodemailer Transporter (Brevo SMTP)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Send Email Route
app.post("/api/emails/send", async (req, res) => {
  const { to, subject, message } = req.body;

  if (!to || !subject || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    await transporter.sendMail({
      from: process.env.SENDER_EMAIL || process.env.SMTP_USER,
      to,
      subject,
      text: message,
    });

    const log = await EmailLog.create({ to, subject, message, status: "Sent" });
    res.status(200).json({ success: true, data: log });
  } catch (error) {
    console.error("Send email error:", error);
    res.status(500).json({ success: false, error: "Failed to send email" });
  }
});

// Get Sent Emails History
app.get("/api/emails", async (req, res) => {
  try {
    const emails = await EmailLog.find().sort({ createdAt: -1 });
    res.json(emails);
 } catch (error) {
    console.error("Fetch emails error:", error);
    res.status(500).json({ error: "Failed to fetch emails" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});