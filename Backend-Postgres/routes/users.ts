import express, { Request, Response, NextFunction } from "express";
import { getClient } from "../database/connection";
import { authenticateUser, SECRET_KEY } from "../middlewares/auth";
import jwt from "jsonwebtoken";
const router = express.Router();

//Signup user
router.post("/signup", async (req: Request, res: Response) => {
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
      const newUserText = `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING email`;
      const userRes = await client.query(newUserText, [email, password]);
      if (userRes.rows.length > 0) {
        res.json({ message: "User successfully signed in!" });
      }

      //JWT implementation
      const token = jwt.sign({ email: newUserText }, SECRET_KEY, {
        expiresIn: "5h",
      });
      res.json({ message: "User created successfully", token });
    }
  } catch (err) {
    console.log(err);
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
      //JWT implementation
      const token = jwt.sign({ email: email }, SECRET_KEY, {
        expiresIn: "5h",
      });
      res.json({ message: "User Login successfully", token });
    } else {
      res.json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "Some Internal Errors" });
  }
});

//me
router.get("/me", authenticateUser, async (req, res) => {
  const { email } = req.headers;

  const client = await getClient();

  const selectUserText = `SELECT * FROM users WHERE email = $1`;
  const userRes = await client.query(selectUserText, [email]);

  console.log(userRes);

  if (userRes.rows.length > 0) {
    res.status(200).json({ email: userRes.rows[0].email });
  } else {
    res.status(404).json({ message: "User not found!" });
  }
});

export { router as userRoutes };
