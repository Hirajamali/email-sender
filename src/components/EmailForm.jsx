import { useState } from "react";

export default function EmailForm({ apiUrl, onEmailSent }) {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg("");

    try {
      const res = await fetch(`${apiUrl}/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to, subject, message }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatusMsg("Email sent successfully!");
        setTo("");
        setSubject("");
        setMessage("");
        if (onEmailSent) onEmailSent();
      } else {
        setStatusMsg(data.error || "Failed to send email.");
      }
    } catch {
      setStatusMsg("Backend server se connection fail ho gaya.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
      <h1 className="text-2xl font-bold mb-4 text-emerald-400">
        MERN Email Sender
      </h1>

      <form onSubmit={handleSend} className="space-y-4">
        <div>
          <label className="block text-sm text-zinc-400 mb-1 font-medium">
            To (Recipient Email)
          </label>
          <input
            type="email"
            required
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="receiver@example.com"
            className="w-full rounded-lg bg-zinc-950 border border-zinc-700 px-3 py-2 text-zinc-100 focus:outline-none focus:border-emerald-400"
          />
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-1 font-medium">
            Subject
          </label>
          <input
            type="text"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter email subject"
            className="w-full rounded-lg bg-zinc-950 border border-zinc-700 px-3 py-2 text-zinc-100 focus:outline-none focus:border-emerald-400"
          />
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-1 font-medium">
            Message
          </label>
          <textarea
            rows="4"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            className="w-full rounded-lg bg-zinc-950 border border-zinc-700 px-3 py-2 text-zinc-100 focus:outline-none focus:border-emerald-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold py-2.5 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Sending Email..." : "Send Email"}
        </button>
      </form>

      {statusMsg && (
        <p className="mt-4 text-sm font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 p-2.5 rounded-lg text-center">
          {statusMsg}
        </p>
      )}
    </div>
  );
}