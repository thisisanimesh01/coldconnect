export default function EmailPreview({ preview, onSend, onClose }) {
  return (
    <div className="bg-white mt-6 p-6 rounded-xl shadow-lg">

      <h2 className="text-xl font-bold mb-2">Email Preview</h2>

      <p><b>To:</b> {preview.email}</p>
      <p><b>Subject:</b> {preview.subject}</p>

      <div className="border p-4 mt-3 rounded bg-gray-50 whitespace-pre-line">
        {preview.body}
      </div>

      <div className="flex gap-4 mt-4">
        <button
          onClick={onSend}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Send Email
        </button>

        <button
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}