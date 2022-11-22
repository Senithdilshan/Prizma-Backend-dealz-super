import express, { Request, Response, Router } from 'express'
import { PrismaClient } from "@prisma/client";
import * as jwt from 'jsonwebtoken'
const router = Router()
const prisma = new PrismaClient();
import {authenticatoken} from '../../helper'

// router.use((req, res, next) => {
//     //check if the access token is valid and non expired
//     if(true){
//         next()
//     } else {
//         res.status(403).send()
//     }
// })
router.use(authenticatoken)

router.post("/",async (req: Request, res: Response) => {
    try {
        const { productId, barcode, productName } = req.body;
        console.log(req.body);

        const product = await prisma.product.create({
            data: {
                productId: productId,
                barcode: barcode,
                productName: productName,
            },
        });
        res.send(product);
    } catch (error) {
        res.status(500).send(error)
    }

});

router.get("/", async (req: Request, res: Response) => {
    try {
        const products = await prisma.product.findMany(
            {
                where: {
                    status: 'active',
                },
                orderBy:{
                    productId:'asc'
                }
                
            }
        );
        res.send(products);

    } catch (error) {
        res.status(500).send(error)
    }

});

router.put("/", async (req: Request, res: Response) => {
    try {
        const { productId, barcode, productName } = req.body;
    const updateProduct = await prisma.product.update({
        where: {
            productId: productId
        },
        data: {
            barcode: barcode,
            productName: productName,
        }
    });
    res.send(updateProduct);
        
    } catch (error) {
        res.status(500).send(error)
    }
    
});

router.delete("/:productId", async (req: Request, res: Response) => {
    try {
        const productId = req.params.productId;
        const deleteProduct = await prisma.product.update({
            where: {
                productId: productId
            },
            data: {
                status: "deactive",
            }
        });
        res.send(deleteProduct);
    } catch (error) {
        res.status(500).send(error)
    }
   
});


export default router