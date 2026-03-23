import {Router} from "express";
import type {Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import 'dotenv/config';

export const router = Router();

interface UserCredentials {
    email: string;
    password: string;
    role: string;
}


const users: UserCredentials[] = [
    {
        email: "test@gmail.com",
        password: bcrypt.hashSync("test", 10),
        role: "admin"
    },
    {
        email: "test1@gmail.com",
        password: bcrypt.hashSync("test", 10),
        role: "user"
    }

]
const SECRET_KEY: string = process.env.SECRET_KEY || "TestSecret";

router.post("/login", (req: Request, res: Response) => {
    const userCredentials: UserCredentials = req.body;
    const user: UserCredentials | undefined = users.find(searchUser => searchUser.email === userCredentials.email);
    if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED).json("Not user found");
    }
    if(!bcrypt.compareSync(userCredentials.password, user.password)) {
        return res.status(StatusCodes.UNAUTHORIZED).json("Wrong password");
    }

    const userClaims = {
        email: user.email,
        role: user.role,
    }

    const minutes: number = 15;
    const expiresAt = new Date(Date.now() + minutes * 60000);

    const token = jwt.sign({
        user: userClaims,
        exp: expiresAt.getTime() / 1000,
    },
        SECRET_KEY
    );

    return res.status(StatusCodes.OK).json({
        userClaims: userClaims,
        expiresAt: expiresAt.getTime() / 1000,
        accessToken: token
    });

});

