import express from "express";
import { getAnswersForQuestion, addAnswerToQuestion } from "../models/index.model.js";

const router = express.Router();

// 1. Show all answers for a single question
router.get("/:questionId/answers", async (req, res) => {
  try {
    const questionId = Number(req.params.questionId);
    const answers = await getAnswersForQuestion(questionId);
    res.json(answers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 2. Add a new answer to an existing question
router.post("/:questionId/answers", async (req, res) => {
  try {
    const questionId = Number(req.params.questionId);
    const { body, user_id, accepted, score } = req.body;
    const answer = await addAnswerToQuestion(questionId, { body, user_id, accepted, score });
    res.status(201).json(answer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;