import fs from "fs";
import path from "path";

export const getHistory = (req, res) => {
  const filePath = path.join(process.cwd(), "data/history.json");
  const data = fs.readFileSync(filePath, "utf-8");
  res.json(JSON.parse(data));
};