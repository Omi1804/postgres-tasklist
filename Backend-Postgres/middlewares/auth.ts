import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.SECRET || "SECr3t";
import express, { Response, Request, NextFunction } from "express";

const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export { authenticateUser, SECRET_KEY };
