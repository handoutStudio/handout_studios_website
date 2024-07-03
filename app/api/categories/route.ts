import { NextResponse } from "next/server";

export async function POST(request: any) {
    try
    {
        const { title, description, slug,  image } = await request.json();
        const newCategory = { title, description, slug,  image };
        console.log(newCategory);
        return NextResponse.json(newCategory, { status: 200 });
    }
    catch (error)
    {
        console.log(error);
        return NextResponse.json({ message: "Failed to create new Category...!", error }, { status: 500 });
    }
}