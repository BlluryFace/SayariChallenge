import pool from "../config/database.js"

// Test connection message
export const getMessage = async (): Promise<string> => {
  await pool.query("SELECT 1")
  return "Hello from backend in TypeScript!"
}

// Get all questions and answers for a specific user
export const getUserQuestionsAndAnswers = async (userId: number) => {
  const result = await pool.query(`
    SELECT
      q.id AS question_id,
      q.title,
      q.body AS question_body,
      a.id AS answer_id,
      a.body AS answer_body,
      a.accepted
    FROM questions q
    LEFT JOIN answers a ON q.id = a.questions_id
    WHERE q.user_id = $1
  `, [userId])
  return result.rows
}

// Get all answers for a specific question
export const getAnswersForQuestion = async (questionId: number) => {
  const result = await pool.query(`
    SELECT id, body, creation, score, accepted, user_id
    FROM answers
    WHERE questions_id = $1
  `, [questionId])
  return result.rows
}

// Find user by name
export const findUserByName = async (name: string) => {
  const result = await pool.query(`
    SELECT * FROM users WHERE name = $1
  `, [name])
  return result.rows[0] || null
}