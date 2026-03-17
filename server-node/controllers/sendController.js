import axios from "axios";
import { getPreview } from "../services/pythonService.js";

export const previewEmail = async (req, res) => {
  try {
    const preview = await getPreview(req.body);
    res.json(preview);
  } catch (err) {
    console.error("Preview Error:", err.message);
    res.status(500).json({ error: "Preview failed" });
  }
};

export const sendEmail = async (req, res) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/send-email",
      req.body
    );
    res.json(response.data);
  } catch (err) {
    console.error("Send Error:", err.message);
    res.status(500).json({ status: "failed" });
  }
};