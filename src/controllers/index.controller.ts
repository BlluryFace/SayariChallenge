import express from "express";
import { getMessage } from "../models/index.model.js";

export const getHome = async (req: express.Request, res: express.Response) => {
  try {
    const message = await getMessage();
    res.json({ message });
  } catch (error) {
    console.error(error); // always log errors during dev
    res.status(500).json({ error: "Internal server error" });
  }
};