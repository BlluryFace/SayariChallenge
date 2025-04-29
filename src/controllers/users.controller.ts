import express from "express";
import { getUserQuestionsAndAnswers } from "../models/index.model.js";
const router = express.Router();

// 1. Show all questions and answers for a specific user
router.get("/:userId", async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    const data = await getUserQuestionsAndAnswers(userId);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;