import { Request, Response, Router } from 'express';
import { PrismaClient } from "@prisma/client";

const router = Router()
const prisma = new PrismaClient();

router.post("/", async (req: Request, res: Response) => {
    try {
        const { paymentId , supplierId , supplierName , paymentDescription, paymentAmount,accountNumber } = req.body;
        console.log(req.body);

        const supplier_payment = await prisma.supplier_payments.create({
            data: {
                paymentId : paymentId ,
                supplierId : supplierId ,
                supplierName : supplierName ,
                paymentDescription : paymentDescription ,
                paymentAmount : paymentAmount,
                // accountNumber : accountNumber
            },
        });
        res.send(supplier_payment);
    } catch (error) {
        res.status(500).send(error)
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

export default router ;