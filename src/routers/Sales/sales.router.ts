import { Request, Response, Router } from 'express';
import { PrismaClient } from "@prisma/client";
import { authenticatoken } from '../../helper';

const router = Router()
const prisma = new PrismaClient();
//router.use(authenticatoken)


router.post("/", async (req: Request, res: Response) => {
    try {
        const { customerId, productId, quantity , price , netAmount , discount, totalAmount  } = req.body;
        console.log(req.body);

        const sale = await prisma.sale.create({
            data: {
                customerId : Number(customerId) ,
                productId : productId,
                quantity : Number(quantity),
                price : Number(price),
                netAmount : Number(netAmount),
                discount : Number(discount),
                totalAmount : Number(totalAmount),
            },
        });
        res.send(sale);
    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }

});

router.get("/", async (req: Request, res: Response) => {
    try {
        const sale = await prisma.sale.findMany(
            {
                where: {
                    status: 'active',
                },
                orderBy:{
                    saleId:'asc'
                }
                
            }
        );
        res.send(sale);

    } catch (error) {
        res.status(500).send(error)
    }

});

router.delete("/:saleId", async (req: Request, res: Response) => {
    try {
        const saleId = req.params.saleId;
        const deleteSale = await prisma.sale.update({
            where: {
                saleId : Number(saleId)
            },
            data: {
                status: "deactive",
            },
        });
        res.send(deleteSale);
    } catch (error) {
        res.status(500).send(error)
    }
   
});


export default router ;