import express, { Request, Response, Router } from 'express'
import { PrismaClient } from "@prisma/client";
const router = Router()
const prisma = new PrismaClient();

router.post("/", async (req: Request, res: Response) => {
    try {
        const { grnID,productId,warehouseID,supplierID,batchNo, quantity, totalBuyingPrice} = req.body;
        
        const GRN = await prisma.gRN.create({
            data: {
                grnID:grnID,
                productId: productId,
                warehouseID: warehouseID,
                supplierID:supplierID,
                batchNo: batchNo,
                quantity: Number(quantity),
                totalBuyingPrice: Number(totalBuyingPrice)
            },
        });
        res.send(GRN);

    } catch (error) {
        console.log({error});
        
        res.status(500).send(error)
    }
});

router.get("/", async (req: Request, res: Response) => {
    try {
        const GRNs = await prisma.gRN.findMany(
            {
                where: {
                    status: 'active',
                },
                orderBy:{
                    productId:'asc'
                }
            }
        );
        res.send(GRNs);
    } catch (error) {
        res.status(500).send(error)
    }
});




export default router