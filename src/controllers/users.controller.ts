import express from "express";
import { getUserQuestionsAndAnswers, deleteUserAndData } from "../models/index.model.js";

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

// 2. Delete a user and all their questions, answers, comments
router.delete("/:userId", async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    await deleteUserAndData(userId);
    res.json({ message: "User and related data deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;