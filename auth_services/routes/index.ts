import { Router } from "express";
import AuthRouter from "./authRoutes";
import UserRouter from "./UserRoutes";

const routes = Router();

routes.use("/api/auth", AuthRouter);
routes.use("/", UserRouter)

export default routes;
