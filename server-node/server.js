import express from "express";
import cors from "cors";
import sendRoutes from "./routes/send.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/send", sendRoutes);

app.listen(5001, () => {
  console.log("Node server running on 5001");
});

app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url);
  next();
});