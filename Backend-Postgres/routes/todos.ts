import express, { Request, Response, NextFunction } from "express";
import { authenticateUser, SECRET_KEY } from "../middlewares/auth";
import { getClient } from "../database/connection";
const router = express.Router();

//creating a new todo
router.post("/todos", authenticateUser, async (req, res) => {
  const { title, description } = req.body;
  const { user_id } = req.headers;

  if (!title || !description) {
    return res.status(404).json({ message: "No title or description" });
  }

  try {
    const client = await getClient();

    const userText = `
    INSERT INTO todos (title, description,  user_id) VALUES ($1, $2, $3)
    `;
    await client.query(userText, [title, description, user_id]);

    return res.status(200).json({ message: "Todo created successfully" });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "Some Internal Error" });
  }
});

//get todos
router.get("/todos", authenticateUser, async (req, res) => {
  const { user_id } = req.headers;

  if (!user_id) {
    return res.status(404).json({ message: "User not found" });
  }

  const client = await getClient();
  const userText = `
    SELECT * FROM todos WHERE user_id = $1
  `;

  const userRes = await client.query(userText, [user_id]);

  if (userRes.rows.length === 0) {
    return res.status(404).json({ message: "Todos does not exists" });
  }

  return res.status(200).json(userRes.rows);
});

//updating the existing todo
router.patch("/todos/:id", async (req, res) => {});

//deleting the existing todo
router.delete("/todos/:id", async (req, res) => {});

export { router as todoRoutes };
