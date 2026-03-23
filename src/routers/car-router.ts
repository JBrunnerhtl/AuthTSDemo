import {Router} from "express";
import type {Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
import {cars} from "../data/data.ts";

export const carRouter: Router = Router();


carRouter.get("/cars", (req: Request, res: Response) => {
    res.status(StatusCodes.OK).send(cars)
})


carRouter.get("/car/:index", (req: Request, res: Response) => {
    const {index }  = req.params;
    try {
        if(index == undefined || typeof index !== "string") throw new Error("Car doesn't exist");
        res.status(StatusCodes.OK).send(cars[parseInt(index)]);
    }catch (e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
    }
})
