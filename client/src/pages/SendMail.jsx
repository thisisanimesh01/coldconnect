import { useState } from "react";
import EmailPreview from "../components/EmailPreview";

const API = "http://localhost:5001";

export default function SendMail() {
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePreview = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API}/send/preview`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ company, email, role }),
      });

      if (!res.ok) throw new Error("Preview failed");

      const data = await res.json();
      setPreview(data);
    } catch (err) {
      console.error(err);
      alert("Preview failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API}/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ company, email, role }),
      });

      const data = await res.json();
      alert("✅ Email sent!");
      setPreview(null);
    } catch (err) {
      console.error(err);
      alert("❌ Send failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">

      <input
        placeholder="Company Name"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className="w-full p-3 border rounded-lg bg-gray-100"
      />

      <input
        placeholder="Company Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 border rounded-lg bg-gray-100"
      />

      <input
        placeholder="Job Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full p-3 border rounded-lg bg-gray-100"
      />

      <button
        onClick={handlePreview}
        className="w-full bg-blue-600 text-white py-3 rounded-lg"
      >
        {loading ? "Loading..." : "Preview Email"}
      </button>

      {preview && (
        <EmailPreview
          preview={preview}
          onSend={handleSend}
          onClose={() => setPreview(null)}
        />
      )}
    </div>
  );
}