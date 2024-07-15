import { NextResponse } from "next/server";

export async function POST(request: any) {
    try
    {
        const { title, slug, description, image, content, selectCategory, isActive } = await request.json();
        const newCommunity = { title, slug, description, image, content, selectCategory, isActive };
        return NextResponse.json(newCommunity, { status: 200 });
    }
    catch (error)
    {
        console.log(error);
        return NextResponse.json({ message: "Failed to create new Community...!", error }, { status: 500 });
    }
}