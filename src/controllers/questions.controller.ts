import express from "express";
import { getAnswersForQuestion, addAnswerToQuestion } from "../models/index.model.js";
import jwt, {JwtPayload} from "jsonwebtoken";

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
// Extend request type to include `user`
interface AuthenticatedRequest extends Request {
  user?: JwtPayload | string
}
// 2.  POST /:questionId/answers – only accessible with valid JWT
router.post("/:questionId/answers", async (req , res) => {
  const token : string | undefined = req.headers.authorization

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" })
  }

  let decoded: string | JwtPayload
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET as string)
    if (typeof decoded === "string") {
      return res.status(401).json({ message: "Unauthorized: Invalid token" })
    }
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" })
  }

  try {
    const questionId: number = Number(req.params.questionId)
    if (isNaN(questionId)) {
      return res.status(400).json({ error: "Invalid question ID" })
    }
    interface AnswerInput {
      body: string
      accepted: boolean
      score: number
    }

    const { body, accepted, score }: AnswerInput = req.body
    const user_id = decoded.userId
    const answer = await addAnswerToQuestion(questionId, { body, user_id, accepted, score })
    res.status(201).json(answer)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })
  }
})

export default router;