import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcryptjs from 'bcryptjs'; 


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email, password, address} = reqBody;
        const user = await prisma.user.findUnique({
            where: { email: email },
        });
        console.log("1")
        if(user) {
            return NextResponse.json({error: "User already exists"}, {status:400});
        }
        console.log("2")
        const salt = await bcryptjs.genSalt(10);
        const passwordHash = await bcryptjs.hash(password, salt);
        console.log("2")
        const savedUser = await prisma.user.create({
            data: {
                email,
                password: passwordHash,
                address,
            },
        });
        console.log("2")
        return NextResponse.json({message: "User registered successfully", success: true, savedUser})
    } catch(error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}