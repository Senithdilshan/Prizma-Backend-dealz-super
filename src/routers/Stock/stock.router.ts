import express, { Request, Response, Router } from 'express'
import { PrismaClient } from "@prisma/client";
const router = Router()
const prisma = new PrismaClient();

router.post("/", async (req: Request, res: Response) => {
    try {
        const { productId,warehouseID, batchNo, quantity, buyingPrice, sellingPrice } = req.body;
        const stock = await prisma.stock.create({
            data: {
                productId: productId,
                warehouseID: warehouseID,
                batchNo: batchNo,
                quantity: Number(quantity),
                buyingPrice: Number(buyingPrice),
                sellingPrice: Number(sellingPrice),
            },
        });
        res.send(stock);
    } catch (error) {
        console.log({error});
        
        res.status(500).send(error)
    }
});

router.get("/", async (req: Request, res: Response) => {
    try {
        const stocks = await prisma.stock.findMany(
            {
                where: {
                    status: 'active',
                },
                orderBy:{
                    productId:'asc'
                }
            }
        );
        res.send(stocks);
    } catch (error) {
        res.status(500).send(error)
    }
});

router.put("/", async (req: Request, res: Response) => {
    try {
        const {  productId,warehouseID, batchNo, quantity, buyingPrice, sellingPrice} = req.body;
        const updatestock = await prisma.stock.update({
            where: {
                batchNo:batchNo
                
            },
            data: {
                warehouseID:warehouseID,
                batchNo:batchNo,
                quantity: Number(quantity),
                buyingPrice: Number(buyingPrice),
                sellingPrice: Number(sellingPrice),
            }
        });
        res.send(updatestock);
    } catch (error) {
        res.status(500).send(error)
    }
});

router.delete("/:batchNo", async (req: Request, res: Response) => {
    try {
        const batchNo = req.params.batchNo;
        const deletebatch = await prisma.stock.update({
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