import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'; 

import prisma from '../config/db.config';
import AuthRequest from '../types';

dotenv.config();


class AuthController {
  static async register(req: express.Request, res: express.Response) {
    try {
      const payload = req.body;
      const salt = bcrypt.genSaltSync(10);
      payload.password = bcrypt.hashSync(payload.password, salt);
  
      const user = await prisma.user.create({
        data: payload
      })
  
      return res.status(201).json({
        message: 'User registered successfully',
        data: user,
      });
      
    } catch (error) {
      
      return res.status(500).json({
        message: 'Something went wrong. Please try again later.',
        error: error,
      });
    }
  }

  static async login(req: express.Request, res: express.Response) {
    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email
        }
      });

      if (!user) {
        return res.status(404).json({
          message: 'User not found',
        });
      } else {
        if (!bcrypt.compareSync(password, user.password)) {
          return res.status(401).json({
            message: 'Invalid password',
          });
        }
  
        const payload = {
          id: user.id,
          email: user.email,
          name: user.name,
        };
        // Generate JWT token here (if needed)
        const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' });
  
        return res.status(200).json({
          message: 'Login successful',
          token: `Bearer ${token}`
        });
      }

    } catch (error) {
      return res.status(500).json({
        message: 'Something went wrong. Please try again later.',
        error: error,
      });
    }
  }

  static async user(req: AuthRequest, res: Response) {
    try {
      const userInfo = req.user;

      return res.status(200).json({
        message: "User fetched Successfully!",
        user: userInfo
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Something Went Wrong!',
      });
    }
  }
}

export default AuthController;