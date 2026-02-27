import db from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const brand = searchParams.get("brand"); // optional filter
        const isRead = searchParams.get("isRead"); // optional filter
        const where: any = {};
        if (brand) {
            if (!["EARTHLINE_MADE", "HANDOUT_STUDIOS"].includes(brand)) return NextResponse.json( { success: false, message: "Invalid brand value" }, { status: 400 } );
            where.brand = brand;
        }
        if (isRead !== null) where.isRead = isRead === "true";
        const messages = await db.contactUs.findMany({ where, orderBy: { createdAt: "desc", }, });
        return NextResponse.json( { success: true, count: messages.length, data: messages, }, { status: 200 } );
    }
    catch (error) {
        console.error("Fetch Contact Messages Error:", error);
        return NextResponse.json( { success: false, message: "Something went wrong" }, { status: 500 } );
    }
}