import axios from "axios";

export const getPreview = async (data) => {
  try {
    console.log("Sending to Python:", data);

    const response = await axios.post(
      "http://localhost:8000/preview",
      data
    );

    console.log("Python response:", response.data);

    return response.data;

  } catch (err) {
    console.error("🔥 FULL ERROR:", err.response?.data || err.message);
    throw err;
  }
};