import express, { Request, Response, NextFunction } from "express";
import { authenticateUser, SECRET_KEY } from "../middlewares/auth";
const router = express.Router();

//creating a new todo
router.post("/todos", authenticateUser, async (req, res) => {
  const { title, description } = req.body;
  
});

//get all todos
router.get("/todos", async (req, res) => {});

//get single todo
router.get("/todo/:id", async (req, res) => {});

//updating the existing todo
router.patch("/todo/:id", async (req, res) => {});

//deleting the existing todo
router.delete("/todo/:id", async (req, res) => {});

export { router as todoRoutes };
