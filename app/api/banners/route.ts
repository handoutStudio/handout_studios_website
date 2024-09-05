import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: any) {
    try
    {
        const { title, slug, link, image, isActive } = await request.json();
        const newBannerData = { title, slug, link, image, isActive }
        const newBanner = await db.banner.create({ data:  { ...newBannerData } });
        return NextResponse.json(newBanner, { status: 200 });
    }
    catch (error)
    {
        console.log(error);
        return NextResponse.json({ message: "Failed to create new Banner...!", error }, { status: 500 });
    }
}