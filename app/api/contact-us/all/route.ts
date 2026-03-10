import db from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        const brand = searchParams.get("brand");
        const isRead = searchParams.get("isRead");
        const isDeleted = searchParams.get("isDeleted"); // allow trash view

        const where: any = {};

        // Brand filter
        if (brand) {
            if (!["EARTHLINE_MADE", "HANDOUT_STUDIOS"].includes(brand)) return NextResponse.json( { success: false, message: "Invalid brand value" }, { status: 400 });
            where.brand = brand;
        }

        // Read filter
        if (isRead !== null) where.isRead = isRead === "true";

        // Soft delete filter (default = false)
        if (isDeleted !== null) where.isDeleted = isDeleted === "true";
        else where.isDeleted = false;

        const messages = await db.contactUs.findMany({ where, orderBy: { createdAt: "desc", }, });

        return NextResponse.json( { success: true, count: messages.length, data: messages, }, { status: 200 } );

    }
    catch (error) {
        console.error("Fetch Contact Messages Error:", error);
        return NextResponse.json( { success: false, message: "Something went wrong" }, { status: 500 } );
    }
}