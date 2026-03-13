export default function EmailPreview({ data, templates, onSend, onClose }) {
  const { company, email, role } = data;

  const template =
    templates.find((t) =>
      t.tags.some((tag) => role.toLowerCase().includes(tag))
    ) || templates[0];

  let body = template.body;

  const placeholders = {
    company,
    role,
    your_name: "Animesh Yadav",
    skills: "Python, C++, Rust, AI/ML",
    why: "my AI/ML personal projects",
  };

  for (let k in placeholders) {
    body = body.replaceAll("{" + k + "}", placeholders[k]);
  }

  return (
    <div className="mt-6 bg-gray-50 border rounded-xl p-6 shadow">

      <h3 className="text-xl font-semibold mb-3">Email Preview</h3>

      <p className="text-sm text-gray-600 mb-1">
        <b>To:</b> {email}
      </p>

      <p className="text-sm text-gray-600 mb-4">
        <b>Subject:</b>{" "}
        {template.subject
          .replace("{company}", company)
          .replace("{role}", role)}
      </p>

      <div className="bg-white border p-4 rounded-lg whitespace-pre-wrap text-sm mb-4">
        {body}
      </div>

      <div className="flex gap-3">

        <button
          onClick={onSend}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
        >
          Send Email
        </button>

        <button
          onClick={onClose}
          className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg"
        >
          Close
        </button>

      </div>

    </div>
  );
}