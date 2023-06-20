import { prisma } from "@/lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt'


const handler = async(req : NextApiRequest, res: NextApiResponse) => {
    if(req.method !== 'POST'){
        res.status(405).json({message: "Method not allowed"});
    }
   
   
    try{
        const {name, email, password} = req.body;
        const userExists = await userAlreadyExists(email);
        if(userExists){
            return res.status(400).json({message: `User already exists for ${email}`})
        }
        const hashedpassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                hashedpassword,
                image: '',
                emailVerified: new Date()
            }
        })

        return res.status(201).json({message: "User created successfully", data: user})
    
    } catch(error){
        console.log(error);
        res.status(500).json({message: "Something went wrong"})
    
    }
    
}


//user already exists by email
const userAlreadyExists = async(email: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    return !!user
}

export default handler;