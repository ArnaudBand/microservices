import { Request, Response, Router } from "express";
import UserController from "../controller/UserController";
import AuthRequest from "../types";

const router = Router();


router.get("/getUser/:id", (req: Request, res: Response) => {
  UserController.getUser(req as AuthRequest, res)
});


export default router;