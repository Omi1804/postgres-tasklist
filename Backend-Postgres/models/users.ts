import { getClient } from "../database/connection";

export const createUserTable = async () => {
  const client = await getClient();

  const CreateTable = `
    CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        email VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(50) NOT NULL
    )
  `;

  await client.query(CreateTable);

  console.log("Users Table created successfully!");
};
