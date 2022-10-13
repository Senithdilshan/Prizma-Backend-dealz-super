import express, { Request, Response } from 'express'
import cors from 'cors'
import { PrismaClient } from "@prisma/client";
import ProductRouter from './routers/product.router'
import WarehouseRouter from './routers/warehouse.router'
import BatchRouter from './routers/batch.router'
const app = express()
app.use(cors())
app.use(express.json());
const prisma =new PrismaClient();

app.use('/product', ProductRouter)
app.use('/warehouse', WarehouseRouter)
app.use('/batches', BatchRouter)


app.listen(5000, () => {
    console.log("server running on " + 5000)
})