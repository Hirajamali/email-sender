import { useState, useEffect } from "react";
import EmailForm from "./components/EmailForm";
import EmailHistory from "./components/EmailHistory";

const API_URL = "http://localhost:5000/api/emails";

export default function App() {
  const [history, setHistory] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let active = true;

    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        if (active && Array.isArray(data)) {
          setHistory(data);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch history", error);
      });

    return () => {
      active = false;
    };
  }, [refreshKey]);

  const handleEmailSent = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-2xl space-y-8">
        <EmailForm apiUrl={API_URL} onEmailSent={handleEmailSent} />
        <EmailHistory history={history} />
      </div>
    </div>
  );
}