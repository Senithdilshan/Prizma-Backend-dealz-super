import express, { Request, Response, Router } from 'express'
import { PrismaClient } from "@prisma/client";
import * as bcrypt from 'bcrypt'

const router = Router()
const prisma = new PrismaClient();

//create user
router.post("/", async (req: Request, res: Response) => {
    try {
        const { user_id, name, mobileNo, email, address, userLevel, password, DOB } = req.body;
        // console.log(req.body);
        const salt = await bcrypt.genSalt();
        const hashpass = bcrypt.hashSync(password, salt);
        const user = await prisma.user.create({
            data: {

                user_id: user_id,
                name: name,
                mobileNo: Number(mobileNo),
                email: email,
                address: address,
                userLevel: Number(userLevel),
                password: hashpass,
                DOB: new Date(DOB),
            },
        });
        res.send(user);
    } catch (error) {
        res.status(500).send(error)
        console.log(error);

    }

});

//to get user


router.post("/password", async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const useremail = await prisma.user.findFirst(
            {
                where: {
                    status: 'active',
                    email: {
                        equals: email,
                    }
                }

            }
        );

        const hash = useremail.password;
        const hashpass = bcrypt.compareSync(password, hash)
        console.log(hashpass);
        if (hashpass) {
            res.send(useremail);
        }else{
            // error=new Error('Wrong Password')
            throw new Error('Wrong Password')
        }

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }

});

router.get("/", async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany(
            {
                where: {
                    status: 'active',
                },
                orderBy: {
                    user_id: 'asc'
                }

            }
        );
        res.send(users);

    } catch (error) {
        res.status(500).send(error)
    }

});

//update the user
router.put("/", async (req: Request, res: Response) => {
    try {
        const { user_id, name, mobileNo, email, address, userLevel, password, DOB } = req.body;
        console.log(req.body);

        const updateUser = await prisma.user.update({
            where: {
                user_id: user_id
            },
            data: {
                name: name,
                mobileNo: mobileNo,
                email: email,
                address: address,
                userLevel: userLevel,
                password: password,
                DOB: new Date(DOB),
            }
        });
        res.send(updateUser);

    } catch (error) {
        res.status(500).send(error)
        console.log(error);

    }

});

//delete (deactivate user)
router.delete("/:user_id", async (req: Request, res: Response) => {
    try {
        const userID = req.params.user_id;
        const deleteUser = await prisma.user.update({
            where: {
                user_id: userID
            },
            data: {
                status: "deactive",
            }
        });
        res.send(deleteUser);
    } catch (error) {
        res.status(500).send(error)
        console.log(error);

    }

});


export default router