import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import AuthRequest from "../types";

// Define an extended request interface

export const authMiddleware = (
  req: AuthRequest, 
  res: Response, 
  next: NextFunction
): void => {
  const authHeaders = req.headers.authorization;
  
  if (!authHeaders) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  const token = authHeaders.split(" ")[1];

  if (!token) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  // Verify the token here (e.g., using JWT)
  jwt.verify(token, process.env.JWT_SECRET!, (err: Error | null, payload: any) => {
    if (err) {
      res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }
    req.user = payload; 
    next();
  });
}