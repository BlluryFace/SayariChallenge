import express from "express";
import { getMessage } from "../models/index.model.js";
import usersRouter from "./users.controller.js";
import questionsRouter from "./questions.controller.js";
import authRouter from "./auth.controllers.js"
const router = express.Router();

// Basic home route for testing
router.get("/", async (req: express.Request, res: express.Response) => {
  try {
    const message = await getMessage();
    res.json({ message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.use("/", authRouter);
router.use("/users", usersRouter);
router.use("/questions", questionsRouter);

export default router;