import { useEffect, useState } from "react";
import { getHistory } from "../utils/api";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    getHistory().then((h) => setHistory(h.sent));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Sent Emails</h2>

      {history.map((h) => (
        <div key={h.id} className="p-3 border mb-3 rounded">
          <p><b>Company:</b> {h.company}</p>
          <p><b>Email:</b> {h.email}</p>
          <p><b>Role:</b> {h.role}</p>
          <p><b>Template:</b> {h.template}</p>
          <p><b>Status:</b> {h.status}</p>
          <p><b>Sent:</b> {h.sent_at}</p>
        </div>
      ))}
    </div>
  );
}