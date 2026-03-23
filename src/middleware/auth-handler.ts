import {NextFunction, Request, Response} from 'express';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import 'dotenv/config';

const SECRET_KEY: string = process.env.SECRET_KEY || "TestSecret";


export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization?.replace("Bearer", "");
    if (!authHeader) {
        return res.status(401).json("Not token provided");
    }

}