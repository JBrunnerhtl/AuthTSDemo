
import express from "express";
import swaggerUi from "swagger-ui-express"
import {specs} from "../swaggerConfig.ts";
import type {Response, Request} from "express";
import cors from "cors";

const app = express();


/**
 * @openapi
 * /:
 *  get:
 *    responses:
 *      200:
 *        description: OK
 */
app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Welcome");
})
app.use(express.json());
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(3000, () => {
    console.log("Server running on port 3000");
    console.log("http://localhost:3000");
});
