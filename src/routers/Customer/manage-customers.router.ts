// import { Request, Response, Router } from 'express';
// import { PrismaClient } from "@prisma/client";
// import { Parser } from 'json2csv';
// import fs from 'fs';
// import * as nodemailer from 'nodemailer'

// const router = Router()
// const prisma = new PrismaClient();

// /* CRUD - Create */
// router.post("/", async (req: Request, res: Response) => {
//     try {
//         const ranId = '' + Math.floor(Date.now() / 1000) + Math.floor(1000 + Math.random() * 9000);
//         const { customer_id, name, mobile, loyalty_points, email } = req.body;
//         const customer = await prisma.customer.create({
//             data: {
//                 customer_id: ranId,
//                 name: name,
//                 mobile: mobile,
//                 loyalty_points: Number(loyalty_points),
//                 email: email,
//             },
//         });
//         res.send(customer);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// });

// /* CRUD - Read */
// router.get("/", async (req: Request, res: Response) => {
//     try {

//         const searchTerm: any = req.query?.searchTerm;
//         //console.log(searchTerm);
//         const customers = await prisma.customer.findMany(
//             {
//                 where: !searchTerm ? undefined : {
//                     OR: [
//                         {
//                             name: {
//                                 contains: searchTerm,
//                             },
//                         },
//                         {
//                             email: {
//                                 contains: searchTerm,
//                             },
//                         },
//                         {
//                             mobile: {
//                                 contains: searchTerm,
//                             },
//                         },
//                     ],
//                 },
//                 orderBy: [
//                     { status: 'asc' },
//                     { updatedAt: 'desc' }
//                 ],
//             }
//         );
//         res.send(customers);
//     } catch (error) {
//         res.status(500).send(error)
//     }
// });


// /* CRUD - Read */
// router.get("/export-csv", async (req: Request, res: Response) => {
//     try {
//         const customers = await prisma.customer.findMany(
//             {
//                 orderBy: [
//                     { status: 'asc' },
//                     { updatedAt: 'desc' }
//                 ],
//             }
//         );
//         const jsonUsers = JSON.parse(JSON.stringify(customers));

//         // -> Convert JSON to CSV data
//         const csvFields = ['id', 'name', 'email', 'mobile', 'loyalty_points', 'status', 'createdAt'];
//         const json2csvParser = new Parser({ csvFields });
//         const csv = json2csvParser.parse(jsonUsers);

//         console.log(csv);

//         res.setHeader("Content-Type", "text/csv");
//         res.setHeader("Content-Disposition", "attachment; filename=users.csv");

//         res.status(200).end(csv);
//         // -> Check 'customer.csv' file in root project folder

//     } catch (error) {
//         res.status(500).send(error)
//     }
// });


// /* CRUD - Read */
// router.get("/sendEmail", async (req: Request, res: Response) => {
//     try {

//         const transporter =nodemailer.createTransport({
//             service:'gmail',
//             auth:{
//                 user:'dealzsuperproject@gmail.com',
//                 pass:'dhckxzrbdmyecjmb'
//             }

//         })
//         const customers = await prisma.customer.findMany(
//             {
//                 orderBy: [
//                     { status: 'asc' },
//                     { updatedAt: 'desc' }
//                 ],
//             }
//         );
//         const jsonUsers = JSON.parse(JSON.stringify(customers));
//         for (let index = 0; index < jsonUsers.length; index++) {
//             const element = jsonUsers[index];
//             if (element.loyalty_points >= 100) {
//                 transporter.sendMail({
//                     from:'dealzsuperproject@gmail.com',
//                     to:element?.email,
//                     subject:'You have greater the 100 points',
//                     html: '<b>Hey there! </b><br> You have greater the 100 points<br /><img style="width: 300px; max-width: 600px; height: auto; margin: auto; display: block;" src="https://mailtrap.io/wp-content/uploads/2022/09/Featured_img_2_t.png"  />',
//                 })
//             } else {
//                 transporter.sendMail({
//                     from:'dealzsuperproject@gmail.com',
//                     to:element?.email,
//                     subject:'You have less the 100 points',
//                     html: '<b>Hey there! </b><br> You have less the 100 points<br /><img style="width: 300px; max-width: 600px; height: auto; margin: auto; display: block;" src="https://mailtrap.io/wp-content/uploads/2019/07/Featured_img_option-2_t.png"  />',
//                 })
//             }


//         }

//         res.status(200).send("Emails sent successfully!");

//     } catch (error) {
//         res.status(500).send(error)
//     }
// });




// /* CRUD - Update */
// router.put("/updateCustomer/:customer_id", async (req: Request, res: Response) => {
//     try {
//         const { customer_id, name, mobile, loyalty_points, email } = req.body;
//         const updatecustomer = await prisma.customer.update({
//             where: { customer_id: customer_id },
//             data: {
//                 name: name,
//                 mobile: mobile,
//                 loyalty_points: Number(loyalty_points),
//                 email: email,
//             }
//         });
//         res.send(updatecustomer);
//     } catch (error) {
//         res.status(500).send(error)
//     }
// });

// /* CRUD - Delete
// Not using delete here in-order to retain user data for future reactivation.
// instead using 'deactiveCustomer'as a PUT.
// */
// router.put("/deactiveCustomer/:customer_id", async (req: Request, res: Response) => {
//     try {
//         const customer_id = req.params.customer_id;
//         const deactivateuser = await prisma.customer.update({
//             where: {
//                 customer_id: customer_id
//             },
//             data: { status: "deactive" }
//         });
//         res.send(deactivateuser);
//     } catch (error) {
//         res.status(500).send(error)
//     }
// });

// /*router.delete("/:customer_id", async (req: Request, res: Response) => {
//     try {
//         const customer_id = req.params.customer_id;
//         const deactivateuser = await prisma.customer.update({
//             where: { customer_id: customer_id },
//             data: { status: "deactive" }
//         });
//         res.send(deactivateuser);
//     } catch (error) {
//         res.status(500).send(error)
//     }
// });*/

// export default router