import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

//Signup user
router.get("/signup", (req: Request, res: Response) => {
  const { email, password } = req.body;
});

//Login user

//me

export { router as userRoutes };
