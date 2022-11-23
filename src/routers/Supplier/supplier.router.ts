import { Request, Response, Router } from 'express';
import { PrismaClient } from "@prisma/client";

const router = Router()
const prisma = new PrismaClient();

router.post("/", async (req: Request, res: Response) => {
    try {
        const { supplierId, supplierName , supplierAddress , supplierContactNumber , outstandingAmount } = req.body;
        console.log(req.body);

        const supplier = await prisma.supplier.create({
            data: {
                supplierId : supplierId ,
                supplierName : supplierName,
                supplierAddress : supplierAddress,
                supplierContactNumber : supplierContactNumber,
                outstandingAmount : Number(outstandingAmount),
            },
        });
        res.send(supplier);
    } catch (error) {
        res.status(500).send(error)
    }

});

router.get("/", async (req: Request, res: Response) => {
    try {
        const suppliers = await prisma.supplier.findMany(
            {
                where: {
                    status: 'active',
                },
                orderBy:{
                    supplierId:'asc'
                }
                
            }
        );
        res.send(suppliers);

    } catch (error) {
        res.status(500).send(error)
    }

});

router.put("/", async (req: Request, res: Response) => {
    try {
        const { supplierId, supplierName, supplierAddress , supplierContactNumber } = req.body;
    const updateSupplier = await prisma.supplier.update({
        where: {
            supplierId: supplierId
        },
        data: {
            supplierName : supplierName,
            supplierAddress : supplierAddress,
            supplierContactNumber : supplierContactNumber,
        },
    });
    res.send(updateSupplier);
        
    } catch (error) {
        res.status(500).send(error)
    }
    
});

router.delete("/:supplierId", async (req: Request, res: Response) => {
    try {
        const supplierId = req.params.supplierId;
        const deleteSupplier = await prisma.supplier.update({
            where: {
                supplierId : supplierId
            },
            data: {
                status: "deactive",
            },
        });
        res.send(deleteSupplier);
    } catch (error) {
        res.status(500).send(error)
    }
   
});

router.put("/addoutstanding/" , async (req : Request , res: Response) => {
    try {
        const {supplierID,totalBuyingPrice} = req.body;
        console.log(supplierID);
        console.log(totalBuyingPrice);
        const addoutstanding = await prisma.supplier.update({
            where: {
                supplierId:supplierID
            },
            data:{
                outstandingAmount:{
                    increment:Number(totalBuyingPrice)
                }
            },
        });
        res.send(addoutstanding);
    }catch (error) {
        res.status(500).send(error)
    }
})

router.put("/updateoutstanding/" , async (req : Request , res: Response) => {
    try {
        const {supplierId , paymentAmount } = req.body;
        console.log(supplierId);
        console.log(paymentAmount);
        const updateoutstanding = await prisma.supplier.update({
            where: {
                supplierId : supplierId
            },
            data:{
                outstandingAmount: {
                    decrement: Number(paymentAmount)
                  }
            } 
        });
        res.send(updateoutstanding);
    }catch (error) {
        res.status(500).send(error)
    }
})

export default router ;