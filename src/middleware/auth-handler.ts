import {NextFunction, Request, Response} from 'express';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import 'dotenv/config';

const SECRET_KEY = process.env.SECRET_KEY || "TestSecret";

interface AuthRequest extends Request {
    payload: JwtPayload;
}


export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization?.replace("Bearer", "").trim();
        if (!authHeader) {
            return res.status(401).json("Not token provided");
        }
        const decoded : string | JwtPayload = jwt.verify(authHeader, SECRET_KEY);
        (req as AuthRequest).payload = decoded as JwtPayload;
        next();
    }catch(err) {
        return res.status(401).json("Not authenticated");
    }

}

export function isAdmin(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.header("Authorization")?.replace("Bearer", "").trim();
        if(token === undefined) {
            return res.status(401).json("Not authenticated");
        }
        const payload: JwtPayload = (req as AuthRequest).payload;
        if(payload.user.role === "admin") {
            next();
        }else
        {
            res.status(401).json("Only for admins");
        }
    }catch(err) {

    }
}