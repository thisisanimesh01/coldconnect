import { useEffect, useState } from "react";
import { sendEmail, getTemplates } from "../utils/api";
import EmailPreview from "../components/EmailPreview";

export default function SendMail() {
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [templates, setTemplates] = useState([]);
  const [previewData, setPreviewData] = useState(null);

  useEffect(() => {
    getTemplates().then(setTemplates);
  }, []);

  const preview = () => {
    setPreviewData({ company, email, role });
  };

  const send = async () => {
    const res = await sendEmail({ company, email, role });
    alert("Email sent: " + res.status);
  };

  return (
    <div className="space-y-4">

      <input
        placeholder="Company Name"
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <input
        placeholder="Company Email"
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Job Role"
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      <button
        onClick={preview}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
      >
        Preview Email
      </button>

      {previewData && (
        <EmailPreview
          data={previewData}
          templates={templates}
          onSend={send}
          onClose={() => setPreviewData(null)}
        />
      )}

    </div>
  );
}