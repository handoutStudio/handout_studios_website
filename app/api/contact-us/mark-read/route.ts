import db from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
    try {
        const { ids } = await req.json(); // array of IDs

        if (!ids || !Array.isArray(ids)) return NextResponse.json( { success: false, message: "Invalid IDs" }, { status: 400 } );

        await db.contactUs.updateMany({ where: { id: { in: ids }, }, data: { isRead: true, }, });

        return NextResponse.json({ success: true });
    }
    catch (error) { return NextResponse.json( { success: false, message: "Something went wrong" }, { status: 500 } );
    }
}