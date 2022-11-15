import { Request, Response, Router } from 'express';
import { PrismaClient } from "@prisma/client";

const router = Router()
const prisma = new PrismaClient();

router.post("/", async (req: Request, res: Response) => {
    try {
        const {accountNumber , accountName , bankName , branchName} = req.body;
        console.log(req.body);

        const bank = await prisma.bank.create({
            data: {
                accountNumber : accountNumber ,
                accountName : accountName ,
                bankName : bankName ,
                branchName : branchName ,
            },
        });
        res.send(bank);
    } catch (error) {
        res.status(500).send(error)
    }

});

router.get("/", async (req: Request, res: Response) => {
    try {
        const banks = await prisma.bank.findMany(

        );
        res.send(banks);

    } catch (error) {
        res.status(500).send(error)
    }

});


export default router ;