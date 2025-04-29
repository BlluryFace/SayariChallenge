import express from "express";
import { getMessage } from "../models/index.model.js";
import usersRouter from "./users.controller.js";
import questionsRouter from "./questions.controller.js";

const router = express.Router();

// Basic home route
router.get("/", async (req: express.Request, res: express.Response) => {
  try {
    const message = await getMessage();
    res.json({ message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Use the users and questions routers for respective routes
router.use("/users", usersRouter);
router.use("/questions", questionsRouter);

export default router;