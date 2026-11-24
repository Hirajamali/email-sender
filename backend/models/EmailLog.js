import mongoose from "mongoose";

const emailLogSchema = new mongoose.Schema(
  {
    to: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, default: "Sent" },
  },
  { timestamps: true }
);

export default mongoose.model("EmailLog", emailLogSchema);