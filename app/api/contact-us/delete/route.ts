import db from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    try {
        const { ids } = await req.json();
        if (!ids || !Array.isArray(ids)) return NextResponse.json( { success: false, message: "Invalid IDs" }, { status: 400 } );
        await db.contactUs.updateMany({ where: { id: { in: ids }, }, data: { isDeleted: true, }, });
        return NextResponse.json({ success: true });
    }
    catch (error) {
        console.error(error);
        return NextResponse.json( { success: false, message: "Delete failed" }, { status: 500 } );
    }
}