import express, { Request, Response, NextFunction } from "express";
import { getClient } from "../database/connection";
import { authenticateUser, SECRET_KEY } from "../middlewares/auth";
import jwt from "jsonwebtoken";
const router = express.Router();

//Signup user
router.post("/signup", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ message: "Invalid email or password" });
  }
  try {
    const client = await getClient();

    const selectUserText = `SELECT * FROM users WHERE email = $1`;
    const userRes = await client.query(selectUserText, [email]);

    if (userRes.rows.length > 0) {
      //user exists
      return res.json({ message: "User already exists" });
    } else {
      const newUserText = `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING email,id`;

      const newuserRes = await client.query(newUserText, [email, password]);

      if (newuserRes.rows.length === 0) {
        return res.json({ message: "Database problem!" });
      }

      //JWT implementation
      const token = jwt.sign(
        { email: newuserRes.rows[0].email, id: newuserRes.rows[0].id },
        SECRET_KEY,
        {
          expiresIn: "5h",
        }
      );
      return res.json({ message: "User created successfully", token });
    }
  } catch (err) {
    console.log("Internal Error is ", err);
    return res.json({ message: "Some Internal Errors" });
  }
});

//Login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ message: "Invalid email or password" });
  }

  try {
    const client = await getClient();

    const selectUserText = `SELECT * FROM users WHERE email = $1 AND password = $2`;
    const userRes = await client.query(selectUserText, [email, password]);

    if (userRes.rows.length > 0) {
      //JWT implementation

      const token = jwt.sign(
        { email: userRes.rows[0].email, id: userRes.rows[0].id },
        SECRET_KEY,
        {
          expiresIn: "5h",
        }
      );
      return res.json({ message: "User Login successfully", token });
    } else {
      return res.json({ message: "User not found" });
    }
  } catch (error) {
    console.log("Internal error is : ", error);
    return res.json({ message: "Some Internal Errors" });
  }
});

//me
router.get("/me", authenticateUser, async (req, res) => {
  const { email } = req.headers;

  try {
    const client = await getClient();

    const selectUserText = `SELECT * FROM users WHERE email = $1`;
    const userRes = await client.query(selectUserText, [email]);

    if (userRes.rows.length > 0) {
      return res
        .status(200)
        .json({ email: userRes.rows[0].email, id: userRes.rows[0].id });
    } else {
      return res.status(404).json({ message: "User not found!" });
    }
  } catch (err) {
    console.log("Internal error is : ", err);
    return res.status(404).json({ message: "Some Internal Error!" });
  }
});

export { router as userRoutes };
