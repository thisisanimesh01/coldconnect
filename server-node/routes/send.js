import express from "express";
import { sendEmail, previewEmail } from "../controllers/sendController.js";

const router = express.Router();

router.post("/", sendEmail);
router.post("/preview", previewEmail);

export default router;