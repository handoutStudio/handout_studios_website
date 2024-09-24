import { NextResponse } from "next/server";

export async function POST(request: any) {
    try
    {
        const { title, slug, logo, description, selectCategory, isActive } = await request.json();
        const newMarket = { title, slug, logo, description, selectCategory, isActive };
        return NextResponse.json(newMarket, { status: 200 });
    }
    catch (error)
    {
        console.log(error);
        return NextResponse.json({ message: "Failed to create new Banner...!", error }, { status: 500 });
    }
}