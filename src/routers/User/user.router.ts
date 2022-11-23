import express, { Request, Response, Router } from 'express'
import { PrismaClient } from "@prisma/client";
import * as bcrypt from 'bcrypt'
import { DotenvConfigOptions } from 'dotenv';

import * as jwt from 'jsonwebtoken'
import { authenticatoken } from '../../helper';


const router = Router()
const prisma = new PrismaClient();
//create user

router.post("/",authenticatoken,async (req: Request, res: Response) => {
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


router.post("/login", async (req: Request, res: Response) => {
    // console.log(req.body);
    
    try {
        const { email,password } = req.body;
        // console.log({email,password});
        
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

        if (!useremail) throw new Error('Authentication Failed')
        const hash = useremail.password;
        const hashpass = bcrypt.compareSync(password, hash)
        // console.log(hashpass);
        if (hashpass) {
            const accessToken = jwt.sign({
                userId: useremail.id,
                userLevel: useremail.userLevel,
            }, process.env.JWT_PRIVATE_KEY)
            res.send({
                accessToken: accessToken,
                level:useremail.userLevel
            });
            
        }else{
            // error=new Error('Wrong Password')
            throw new Error('Wrong Password')
        }

    } catch (error) {
        console.log(error);
        res.status(500).send();
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
        const salt = await bcrypt.genSalt();
        const hashpass = bcrypt.hashSync(password, salt);

        const updateUser = await prisma.user.update({
            where: {
                user_id: user_id
            },
            data: {
                name: name,
                mobileNo: Number(mobileNo),
                email: email,
                address: address,
                userLevel: Number(userLevel),
                password: hashpass,
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

router.post("/userlog", async (req: Request, res: Response) => {
    try {
        const {email} = req.body;
        const userlog = await prisma.userlog.create({
            data: {
                email: email,
            },
        });
        res.send(userlog);
    } catch (error) {
        res.status(500).send(error)
        console.log(error);

    }

});


export default router