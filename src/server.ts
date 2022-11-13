import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from "@prisma/client";
import ProductRouter from './routers/Stock/product.router'
import WarehouseRouter from './routers/Stock/warehouse.router'
import BatchRouter from './routers/Stock/batch.router'
import StockRouter from './routers/Stock/stock.router'
// import CustomerRouter from './routers/Customer/manage-customers.router';
import SupplierRouter from './routers/Supplier/supplier.router' ;

const app = express()
app.use(cors())
app.use(express.json());
app.use(express.static('uploads'));
const prisma =new PrismaClient();

app.use('/product', ProductRouter)
app.use('/warehouse', WarehouseRouter)
app.use('/batches', BatchRouter)
app.use('/stock',StockRouter)
// app.use('/manage-customers',CustomerRouter)
app.use('/supplier', SupplierRouter)

app.listen(5000, () => {
    console.log("server running on port 5000")
})