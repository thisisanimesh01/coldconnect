const BASE = "http://localhost:5001/api";

export const getTemplates = async () => {
  const res = await fetch(`${BASE}/templates`);
  return res.json();
};

export const getHistory = async () => {
  const res = await fetch(`${BASE}/history`);
  return res.json();
};

export const sendEmail = async (payload) => {
  const res = await fetch(`${BASE}/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return res.json();
};