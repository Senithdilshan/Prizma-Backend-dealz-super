import { Request, Response, Router } from 'express';
import { PrismaClient } from "@prisma/client";
import { authenticatoken } from '../../helper';
import * as nodemailer from 'nodemailer'

const router = Router()
const prisma = new PrismaClient();
router.use(authenticatoken)

router.post("/", async (req: Request, res: Response) => {
    try {
        const { user_id , name , email , date , reason } = req.body;
        console.log(req.body);

        const userleavenote = await prisma.leavenote.create({
            data: {
                user_id : user_id ,
                name : name ,
                email : email ,
                date : date ,
                reason : reason,
            },
        });
        res.send(userleavenote);

        const transporter =nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:'dealzsuperproject@gmail.com',
                pass:'rwsnwviflkvrpkfi'
            }

        })

        transporter.sendMail({
            from:'dealzsuperproject@gmail.com',
            to: 'amsenith.dilshan@gmail.com',
            subject: 'Leave note for user :'+name ,
            text: 'User Name : '+name+' Has submitted for a leave on '+date+ ' With the following reason : ' +reason ,
        })

    } catch (error) {
        res.status(500).send(error)
    }

});

router.get("/", async (req: Request, res: Response) => {
    try {
        const userleavenote = await prisma.leavenote.findMany(
            {
                orderBy : {
                    createdAt : 'desc'
                }
            }
        );
        res.send(userleavenote);

    } catch (error) {
        res.status(500).send(error)
    }

});

export default router ;