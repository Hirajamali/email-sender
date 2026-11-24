# MERN Email Sender

A full-stack **MERN** (**MongoDB**, **Express.js**, **React**, **Node.js**) web application for sending emails via **Brevo SMTP** and viewing persistent sent-email history stored in **MongoDB Atlas**.

---

## Key Features

- **Real Email Delivery:** Sends emails through Nodemailer configured with Brevo SMTP credentials.
- **Persistent Email Logs:** Stores recipient, subject, message body, and timestamp in MongoDB Atlas using Mongoose.
- **Live History View:** Displays previously sent emails in reverse chronological order and refreshes automatically after sending a new email.
- **Modular Frontend:** Splits UI logic into focused components (`EmailForm.jsx` and `EmailHistory.jsx`) styled with Tailwind CSS.
- **Environment-Based Configuration:** Keeps database URIs and SMTP credentials safely inside `.env`.

---

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, JavaScript (ES6+)
- **Backend:** Node.js, Express.js, Mongoose, Nodemailer (Brevo SMTP)
- **Database:** MongoDB Atlas

---

## Project Structure

```text
email-sender/
├── backend/
│   ├── models/
│   │   └── EmailLog.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── src/
│   ├── components/
│   │   ├── EmailForm.jsx
│   │   └── EmailHistory.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── eslint.config.js
├── index.html
├── package.json
└── vite.config.js