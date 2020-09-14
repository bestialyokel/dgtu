import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";

import * as crypto from "crypto"

import * as nodemailer from "nodemailer"
import e = require("express");


export class UserController {

    private userRepository = getRepository(User);

    private emailRegex = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;

    
    async save(request: Request, response: Response, next: NextFunction) {


        try {
            if (!this.emailRegex.test(request.body.email) && request.body.phoneNumber) {
                response.status(400).json({
                    status: false,
                    msg: "invalid email"
                });
                return;
            }
            
            const emailHash = crypto.createHash("SHA256").update(request.body.email).digest('hex');
    
            let user = new User();
    
            user.emailHash = emailHash;
            user.phoneNumber = request.body.phoneNumber
    
            await this.userRepository.save(user)
            
            response.status(200).json({
                status: true,
                msg: "ok"
            })

        } catch(error) {
            console.log(error)

            response.status(501).json({
                status: false,
                msg: "hz"
            });

        }
        
    }

    async reset(request: Request, response: Response, next: NextFunction) {


        try {
            if (!this.emailRegex.test(request.body.email) && request.body.phoneNumber) {
                response.status(400).json({
                    status: false,
                    msg: "invalid email"
                });
                return;
            }
    
            const emailHash = crypto.createHash("SHA256").update(request.body.email).digest('hex');
    
            const userToReset = await this.userRepository
                .createQueryBuilder("user")
                .where("user.emailHash = :emailHash", {emailHash})
                .getOne();
    
            if (!userToReset) {
                response.status(404).json({
                    status: false,
                    msg: "not found"
                });
                return;
            } 
    
    
            const {transporter, testAccount} = response.locals;

            console.log(testAccount);
    
            const info = await transporter.sendMail({
                from: `"Reset acc" <${testAccount.user}>`,// sender address
                to: `${request.body.email}`, // list of receivers
                subject: 'Reset msg', // Subject line
                text: `${userToReset.phoneNumber}`, // plaintext body
                html: '<b>do i need this html?</b>' // html body
            });
    
            response.status(200).json({
                status: true,
                msg: `reset msg sent to ${request.body.email} from ${testAccount.user}`,

            });
        
        } catch(error) {
            console.log(error);
            response.status(501).json({
                status: false,
                msg: "hz",
            });
        }

    }

}