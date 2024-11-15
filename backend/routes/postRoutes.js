import express from "express";
import postController from "../controllers/postController.js";
import upload from "../config/multer.js";
import path from "path";

const router = express.Router();
console.log("in post routes")
router.post("/image", upload.single("image"), postController.image_upload);
router.post("/feedback", postController.feedback_post);

export default router;
