import { Router, Request, Response, NextFunction } from "express";
import AuthController from "../controller/AuthController";
import { authMiddleware } from "../middleware/AuthMiddlewre";
import AuthRequest from "../types";

const router = Router();

// Regular routes
router.post("/register", (req: Request, res: Response, next: NextFunction) => {
  AuthController.register(req, res).catch(next);
});

router.post("/login", (req: Request, res: Response, next: NextFunction) => {
  AuthController.login(req, res).catch(next);
});

// Private Route - wrap the controller method to handle the type correctly
router.get("/user", authMiddleware, (req: Request, res: Response) => {
   AuthController.user(req as AuthRequest, res)
});

export default router;