import { Client } from "pg";

const DB_URI = process.env.DB_URI;

if (!DB_URI) {
  console.log("Please Define Postgres String");
}

export async function getClient() {
  const client = new Client(DB_URI);

  try {
    await client.connect();
    console.log("Database Connection established!");
    return client;
  } catch (error: any) {
    console.log("Error connecting to database " + error.message);
    throw error;
  }
}
