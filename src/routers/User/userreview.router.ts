import { Request, Response, Router } from 'express';
import { PrismaClient } from "@prisma/client";
import { authenticatoken } from '../../helper';

const router = Router()
const prisma = new PrismaClient();
//router.use(authenticatoken)

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