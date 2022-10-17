import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from "@prisma/client";
import ProductRouter from './routers/Stock/product.router'
import WarehouseRouter from './routers/Stock/warehouse.router'
import BatchRouter from './routers/Stock/batch.router'
import StockRouter from './routers/Stock/stock.router'

const app = express()
app.use(cors())
app.use(express.json());
const prisma =new PrismaClient();

app.use('/product', ProductRouter)
app.use('/warehouse', WarehouseRouter)
app.use('/batches', BatchRouter)
app.use('/stock',StockRouter)

app.listen(5000, () => {
    console.log("server running on port 5000")
})