import { getClient } from "../database/connection";

export const createTodoTable = async () => {
  const client = await getClient();

  const CreateTable = `
    CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        user_id INTEGER REFERENCES users(id) NOT NULL,
        done BOOLEAN DEFAULT FALSE
    )
  `;

  await client.query(CreateTable);
};
