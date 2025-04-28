import pool from "../config/database.js"

export const getMessage = async (): Promise<string> => {
  await pool.query("SELECT 1") // dummy query just to test connection
  return "Hello from backend in TypeScript!"
}