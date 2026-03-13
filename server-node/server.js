import express from "express";
import cors from "cors";
import templatesRoute from "./routes/templates.js";
import historyRoute from "./routes/history.js";
import sendRoute from "./routes/send.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors({ origin: "*" }));  // ← ADD THIS LINE

app.use(express.json());

app.use("/api/templates", templatesRoute);
app.use("/api/history", historyRoute);
app.use("/api/send", sendRoute);

app.listen(5001, () => console.log("Node server running on 5001"));