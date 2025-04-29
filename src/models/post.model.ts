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

// Delete a user and all related data
export const deleteUserAndData = async (userId: number) => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')

    await client.query(`
      DELETE FROM comments
      WHERE user_id = $1
         OR answers_id IN (SELECT id FROM answers WHERE user_id = $1)
         OR questions_id IN (SELECT id FROM questions WHERE user_id = $1)
    `, [userId])

    await client.query(`DELETE FROM answers WHERE user_id = $1`, [userId])
    await client.query(`DELETE FROM questions WHERE user_id = $1`, [userId])
    await client.query(`DELETE FROM users WHERE id = $1`, [userId])

    await client.query('COMMIT')
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }
}