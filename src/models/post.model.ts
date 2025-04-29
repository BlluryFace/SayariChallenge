import pool from "../config/database.js"

// Add a new answer to an existing question
export const addAnswerToQuestion = async (
  questionId: number,
  answerData: { body: string; user_id: number; accepted: boolean; score: number }
) => {
  const { body, user_id, accepted, score } = answerData
  const creation = Math.floor(Date.now() / 1000)
  const result = await pool.query(`
    INSERT INTO answers (body, creation, score, user_id, accepted, questions_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `, [body, creation, score, user_id, accepted, questionId])
  return result.rows[0]
}

// Create a new user
export const createUser = async ({
 name,
  passwordHash,
}: {
  name: string
  passwordHash: string
}) => {
  const result = await pool.query(
    `INSERT INTO users (name, passwordHash) VALUES ($1, $2) RETURNING *`,
    [name, passwordHash]
  )
  return result.rows[0]
}