import db from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const { name, email, phone, subject, message, brand } = body;

        // Basic validation
        if (!name || !email || !message || !brand) return NextResponse.json( { success: false, message: "Missing required fields" }, { status: 400 } );

        // Validate brand enum manually (extra safety)
        if (!["EARTHLINE_MADE", "HANDOUT_STUDIOS"].includes(brand)) return NextResponse.json( { success: false, message: "Invalid brand value" }, { status: 400 } );

        const contact = await db.contactUs.create({ data: { name, email, phone, subject, message, brand, }, });

        return NextResponse.json( { success: true, data: contact }, { status: 201 } );
    }
    catch (error) {
        console.error("Contact API Error:", error);

        return NextResponse.json( { success: false, message: "Something went wrong" }, { status: 500 } );
    }
}