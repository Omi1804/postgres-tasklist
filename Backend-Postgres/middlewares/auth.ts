import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.SECRET || "SECr3t";
import express, { Response, Request, NextFunction } from "express";

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: "Not authorized!" });
  } else {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, SECRET_KEY, (err, user: any) => {
      if (err || !user || !user.email) {
        return res.status(403).json({ message: "Invalid credentials" });
      }

      // if everything is OK
      req.headers["user_id"] = user.id;
      req.headers["email"] = user.email;
      next();
    });
  }
};

export { authenticateUser, SECRET_KEY };
