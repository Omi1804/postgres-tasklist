import express, { Request, Response, NextFunction } from "express";
import { getClient } from "../database/connection";
const router = express.Router();

//Signup user
router.get("/signup", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.json({ message: "Invalid email or password" });
  }
  try {
    const client = await getClient();

    const selectUserText = `SELECT * FROM users WHERE email = $1`;
    const userRes = await client.query(selectUserText, [email]);

    if (userRes.rows.length > 0) {
      //user exists
      res.json({ message: "User already exists" });
    } else {
      const newUserText = `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id`;
      const userRes = await client.query(newUserText, [email, password]);
      if (userRes.rows.length > 0) {
        res.json({ message: "User successfully signed in!" });
      }

      //JWT implementation
    }
  } catch (err) {
    res.json({ message: "Some Internal Errors" });
  }
});

//Login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.json({ message: "Invalid email or password" });
  }

  try {
    const client = await getClient();

    const selectUserText = `SELECT * FROM users WHERE email = $1 AND password = $2`;
    const userRes = await client.query(selectUserText, [email, password]);

    if (userRes.rows.length > 0) {
      res.json({ message: "User Login successfully!" });
      console.log(userRes);
    } else {
      res.json({ message: "User not found" });
    }
  } catch (error) {
    res.json({ message: "Some Internal Errors" });
  }
});

//me
router.get("/me", async (req, res) => {
  const { id } = req.headers;

  const client = await getClient();

  const selectUserText = `SELECT * FROM users WHERE id = $1`;
  const userRes = await client.query(selectUserText, [id]);
});

export { router as userRoutes };
