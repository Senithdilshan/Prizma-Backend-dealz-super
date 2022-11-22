import express, { Request, Response, Router } from 'express'
import { PrismaClient } from "@prisma/client";
import { authenticatoken } from '../../helper';
const router = Router()
const prisma = new PrismaClient();

router.use(authenticatoken)

router.post("/", async (req: Request, res: Response) => {
    try {
        const { warehouseID, location } = req.body;
        const warehouse = await prisma.warehouse.create({
            data: {
                warehouseID: warehouseID,
                location: location,
            },
        });
        res.send(warehouse);
    } catch (error) {
        res.status(500).send(error)
    }

});

router.get("/", async (req: Request, res: Response) => {
    try {
        const warehouses = await prisma.warehouse.findMany(
            {
                where: {
                    status: 'active',
                },
                orderBy: {
                    warehouseID: 'asc'
                }
            }
        );
        res.send(warehouses);
    } catch (error) {
        res.status(500).send(error)
    }

});

router.put("/", async (req: Request, res: Response) => {
    try {
        const { warehouseID, location } = req.body;
        const updateWarehouse = await prisma.warehouse.update({
            where: {
                warehouseID: warehouseID
            },
            data: {
                warehouseID: warehouseID,
                location: location,
            }
        });
        res.send(updateWarehouse);
    } catch (error) {
        res.status(500).send(error)
    }

});

router.delete("/:warehouseID", async (req: Request, res: Response) => {
    try {
        const warehouseID = req.params.warehouseID;
    const deleteWarehouse = await prisma.warehouse.update({
        where: {
            warehouseID: warehouseID
        },
        data: {
            status: "deactive",
        }
    });
    res.send(deleteWarehouse);
    } catch (error) {
        res.status(500).send(error)
    }
});


export default router