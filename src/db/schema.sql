-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    passwordHash VARCHAR NOT NULL
);

-- Questions table
CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    body TEXT,
    creation INTEGER NOT NULL, -- Unix timestamp
    score INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Answers table
CREATE TABLE answers (
    id SERIAL PRIMARY KEY,
    body TEXT,
    creation INTEGER NOT NULL, -- Unix timestamp
    score INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    accepted BOOLEAN NOT NULL,
    questions_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (questions_id) REFERENCES questions(id)
);

-- Comments table
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    body TEXT,
    user_id INTEGER NOT NULL,
    questions_id INTEGER,
    answers_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (questions_id) REFERENCES questions(id),
    FOREIGN KEY (answers_id) REFERENCES answers(id)
);

-- Indexes for better JOIN and WHERE performance
CREATE INDEX idx_questions_user_id ON questions(user_id);
CREATE INDEX idx_answers_user_id ON answers(user_id);
CREATE INDEX idx_answers_questions_id ON answers(questions_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);
CREATE INDEX idx_comments_questions_id ON comments(questions_id);
CREATE INDEX idx_comments_answers_id ON comments(answers_id);