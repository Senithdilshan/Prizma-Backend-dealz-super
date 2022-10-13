import express, { Request, Response, Router } from 'express'
import { PrismaClient } from "@prisma/client";
const router = Router()
const prisma = new PrismaClient();

router.post("/", async (req: Request, res: Response) => {
    try {
        const { productId, batchNo, ManufacturerBNo, mfDate, exDate, buyingPrice, sellingPrice } = req.body;
        console.log(req.body);
        const batch = await prisma.batchNo.create({
            data: {
                productId: productId,
                batchNo: batchNo,
                ManufacturerBNo: ManufacturerBNo,
                mfDate: new Date(mfDate),
                exDate: new Date(exDate),
                buyingPrice: buyingPrice,
                sellingPrice: sellingPrice,
            },
        });
        res.send(batch);
    } catch (error) {
        res.status(500).send(error)
    }
});

router.get("/", async (req: Request, res: Response) => {
    try {
        const batches = await prisma.batchNo.findMany(
            {
                where: {
                    status: 'active',
                }
            }
        );
        res.send(batches);
    } catch (error) {
        res.status(500).send(error)
    }
});

router.put("/", async (req: Request, res: Response) => {
    try {
        const { productId, batchNo, ManufacturerBNo, mfDate, exDate, buyingPrice, sellingPrice } = req.body;
        const updatebatch = await prisma.batchNo.update({
            where: {
                batchNo: batchNo
            },
            data: {
                productId: productId,
                ManufacturerBNo: ManufacturerBNo,
                mfDate: new Date(mfDate),
                exDate: new Date(exDate),
                buyingPrice: buyingPrice,
                sellingPrice: sellingPrice,
            }
        });
        res.send(updatebatch);
    } catch (error) {
        res.status(500).send(error)
    }
});

router.delete("/:batchNo", async (req: Request, res: Response) => {
    try {
        const batchNo = req.params.batchNo;
        const deletebatch = await prisma.batchNo.update({
            where: {
                batchNo: batchNo
            },
            data: {
                status: "deactive",
            }
        });
        res.send(deletebatch);
    } catch (error) {
        res.status(500).send(error)
    }
});


export default router