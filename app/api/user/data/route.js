import dbConnect from "@/config/db";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET (request) {
    try {
        const { userId } = getAuth(request);

        await dbConnect();
        const user = await User.findById(userId);
        console.log(user);
        
        if (!user) 
            return NextResponse.json({ success: false, message: "User Not Found" }, { status: 404 });
        
        return NextResponse.json({ success: true, data: user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 404 });
    }
}