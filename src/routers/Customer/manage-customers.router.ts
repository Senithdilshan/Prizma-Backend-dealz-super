import { Request, Response, Router } from 'express';
import { PrismaClient } from "@prisma/client";

const router = Router()
const prisma = new PrismaClient();
 
/* CRUD - Create */
router.post("/", async (req: Request, res: Response) => {
    try {
        const ranId = '' + Math.floor(Date.now() / 1000) + Math.floor(1000 + Math.random() * 9000);
        const { customer_id, name, mobile, loyalty_points, email } = req.body;
        const customer = await prisma.customer.create({
            data: {
                customer_id: ranId,
                name: name,
                mobile: Number(mobile),
                loyalty_points: Number(loyalty_points),
                email: email,
            },
        });
        res.send(customer);
    } catch (error) {       
        res.status(500).send(error);
    }
});

/* CRUD - Read */
router.get("/", async (req: Request, res: Response) => {
    try {
        const customers = await prisma.customer.findMany(
            {
                /*where: {status: 'active'}*/
                orderBy:[
                    { status:'asc' },
                    { updatedAt:'desc' }
                ]
            }
        );
        res.send(customers);
    } catch (error) {
        res.status(500).send(error)
    }
});

/* CRUD - Update */
router.put("/updateCustomer/:customer_id", async (req: Request, res: Response) => {
    try {
        const {  customer_id, name, mobile, loyalty_points, email} = req.body;
        const updatecustomer = await prisma.customer.update({
            where: { customer_id: customer_id },
            data: {
                name: name,
                mobile: Number(mobile),
                loyalty_points: Number(loyalty_points),
                email: email,
            }
        });
        res.send(updatecustomer);
    } catch (error) {
        res.status(500).send(error)
    }
});

/* CRUD - Delete
Not using delete here in-order to retain user data for future reactivation.
instead using 'deactiveCustomer'as a PUT.
*/
router.put("/deactiveCustomer/:customer_id", async (req: Request, res: Response) => {
    try {
        const customer_id = req.params.customer_id;
        const deactivateuser = await prisma.customer.update({
            where: {
                customer_id: customer_id
            },
            data: { status: "deactive" }
        });
        res.send(deactivateuser);
    } catch (error) {
        res.status(500).send(error)
    }
});

/*router.delete("/:customer_id", async (req: Request, res: Response) => {
    try {
        const customer_id = req.params.customer_id;
        const deactivateuser = await prisma.customer.update({
            where: { customer_id: customer_id },
            data: { status: "deactive" }
        });
        res.send(deactivateuser);
    } catch (error) {
        res.status(500).send(error)
    }
});*/

export default router