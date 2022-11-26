import { Request, Response, Router } from 'express';
import { PrismaClient } from "@prisma/client";
import { authenticatoken } from '../../helper';
import * as nodemailer from 'nodemailer'


const router = Router()
const prisma = new PrismaClient();
//router.use(authenticatoken)

router.post("/", async (req: Request, res: Response) => {
    try {
        const { requestId , supplierId , supplierName, supplierEmail, productId, productName,quantity , date } = req.body;
        console.log(req.body);

        const requestnote = await prisma.requestnote.create({
            data: {
                requestId : requestId ,
                supplierId : supplierId ,
                supplierName : supplierName ,
                supplierEmail : supplierEmail,
                productId : productId ,
                productName : productName,
                quantity : Number(quantity),
                date : date,
            },
        });
        res.send(requestnote);

        const transporter =nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:'dealzsuperproject@gmail.com',
                pass:'rwsnwviflkvrpkfi'
            }

        })

        transporter.sendMail({
            from:'dealzsuperproject@gmail.com',
            to: supplierEmail,
            subject: 'Goods Request note Ref : '+requestId ,
            text: 'Greetings '+supplierName+ ' \n      We would appriciate it if you could send us following goods on or before '+date+' \nItem Name : '+productName+ '\nQuantity : '+quantity+ ' \n\nThank you, \nDealz Super' ,
        })

    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }

});

router.get("/", async (req: Request, res: Response) => {
    try {
        const requestnote = await prisma.requestnote.findMany(
        );
        res.send(requestnote);

    } catch (error) {
        res.status(500).send(error)
    }

});

router.post("/byid", async (req: Request, res: Response) => {
    try {
        const { supplierId , startDate , endDate } = req.body;
        // console.log(req.body) ;
        const supplierPayments = await prisma.supplier_payments.findMany(
            {
                where : {
                    supplierId : supplierId,
                    createdAt : {
                        lte : new Date(endDate),
                        gte : new Date(startDate),
                    },
                },
                orderBy: {
                    createdAt : 'desc'
                }
            }
        );
        res.send(supplierPayments);

    } catch (error) {
        res.status(500).send(error)
    }

});


export default router ;