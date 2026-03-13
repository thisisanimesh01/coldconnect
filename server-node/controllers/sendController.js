import axios from "axios";

export const sendEmail = async (req, res) => {
  try {
    console.log("➡️ Node received:", req.body);

    const response = await axios.post(
      "http://localhost:8000/send-email",
      req.body
    );

    console.log("⬅️ Python responded:", response.data);

    return res.json({ status: response.data.status });
  } catch (err) {
    console.error("❌ Send Email Error:", err);
    return res.json({ status: "failed" });
  }
};