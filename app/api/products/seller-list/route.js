import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET (request) {
    try {
        
        const { userId } = getAuth(request);

        const isSeller = authSeller(userId);

        if ( !isSeller ) 
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        
        await dbConnect();

        const products = await Product.find({});
        return NextResponse.json({ success: true, data: products }, { status: 200 });


    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}