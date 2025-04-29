import { User } from "@prisma/client";
import { Express, Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

interface AuthRequest extends Request {
  user?: User; // Replace 'any' with your actual user type
}

export default AuthRequest;