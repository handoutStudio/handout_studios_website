import { NextResponse } from "next/server";

export async function POST(request: any) {
    try
    {
        const { title, slug, link, image } = await request.json();
        const newBanner = { title, slug, link, image };
        console.log(newBanner);
        return NextResponse.json(newBanner, { status: 200 });
    }
    catch (error)
    {
        console.log(error);
        return NextResponse.json({ message: "Failed to create new Banner...!", error }, { status: 500 });
    }
}