import { Request, Response, Router } from 'express';
import { PrismaClient } from "@prisma/client";
import { authenticatoken } from '../../helper';
import * as nodemailer from 'nodemailer'

const router = Router()
const prisma = new PrismaClient();
router.use(authenticatoken)

router.post("/", async (req: Request, res: Response) => {
    try {
        const { user_id , name , email , rating , description } = req.body;
        console.log(req.body);

        const userreview = await prisma.userreview.create({
            data: {
                user_id : user_id ,
                name : name ,
                email : email ,
                rating : rating ,
                description : description,
            },
        });
        res.send(userreview);

        const transporter =nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:'dealzsuperproject@gmail.com',
                pass:'rwsnwviflkvrpkfi'
            }

        })

        transporter.sendMail({
            from:'dealzsuperproject@gmail.com',
            to: email,
            subject: 'Monthly review for '+name+' from DealzSuper',
            text:'Dear '+name+ ',\nYour Monthly Rating is '+rating+ '.\nFollowing is the comment from the Owner : '+description+'\nThank you,\nDealz Super Management' ,
        })

    } catch (error) {
        res.status(500).send(error)
    }

});

router.get("/", async (req: Request, res: Response) => {
    try {
        const userreviews = await prisma.userreview.findMany(
        );
        res.send(userreviews);

    } catch (error) {
        res.status(500).send(error)
    }

});

export default router ;