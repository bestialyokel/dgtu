

import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response, NextFunction} from "express";
import {Routes} from "./routes";
import {User} from "./entity/User";
import * as nodemailer from "nodemailer";

import * as cors from "cors"




;(async () => {
    try {

        const app = express();
        app.use(bodyParser.json());
        app.use(cors());

        app.use('/static', express.static('public'));
    

        const connection = await createConnection();

        const testAccount = await nodemailer.createTestAccount();

        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: testAccount.user, // generated ethereal user
              pass: testAccount.pass, // generated ethereal password
            },
        });

        //?
        

        app.use((req: Request, res: Response, next: NextFunction) => {
            res.locals.transporter = transporter;
            res.locals.testAccount = testAccount;
            next();
        });



        Routes.forEach(route => {
            (app as any)[route.method]('/api' + route.route, (req: Request, res: Response, next: Function) => {
                const result = (new (route.controller as any))[route.action](req, res, next);
                if (result instanceof Promise) {
                    result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

                } else if (result !== null && result !== undefined) {
                    res.json(result);
                }
            });
        });

        app.listen(3000);

        console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");


    } catch(error) {
        console.log(error);
    }



})()


