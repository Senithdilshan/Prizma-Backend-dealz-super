import { Request, Response, Router } from 'express';
import { PrismaClient } from "@prisma/client";
import { authenticatoken } from '../../helper';
import * as nodemailer from 'nodemailer'


const router = Router()
const prisma = new PrismaClient();
//router.use(authenticatoken)

router.post("/", async (req: Request, res: Response) => {
    try {
        const { paymentId , supplierId , supplierName, supplierEmail, paymentDescription, paymentAmount,accountNumber } = req.body;
        console.log(req.body);

        const supplier_payment = await prisma.supplier_payments.create({
            data: {
                paymentId : paymentId ,
                supplierId : supplierId ,
                supplierName : supplierName ,
                supplierEmail : supplierEmail,
                paymentDescription : paymentDescription ,
                paymentAmount : paymentAmount,
                accountNumber : accountNumber
            },
        });
        res.send(supplier_payment);

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
            subject: 'Payment Transferred for the supplies ' ,
            text:'Dear '+supplierName+ ', A payment of Rs.'+paymentAmount+ ' is paid. Use the following reference number if needed : '+paymentId+ '   |Dealz-Super|',
        })

    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }

});

router.get("/", async (req: Request, res: Response) => {
    try {
        const supplierPayments = await prisma.supplier_payments.findMany(
        );
        res.send(supplierPayments);

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