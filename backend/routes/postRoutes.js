import express from "express";
import postController from "../controllers/postController.js";
import upload from "../config/multer.js";
import path from "path";
import { verifyToken } from "../middlewares/autherizer.js";

const router = express.Router();
console.log("in post routes")
router.post("/image", verifyToken, upload, postController.image_upload);
router.post("/feedback", verifyToken, postController.feedback_post);

export default router;
