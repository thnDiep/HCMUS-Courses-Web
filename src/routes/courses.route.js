import express from "express";
import courseController from "../controllers/CourseController.js";

const router = express.Router();

router.get("/", courseController.index);
router.get("/detail", courseController.detail);
router.get("/join", courseController.join);

export default router;


