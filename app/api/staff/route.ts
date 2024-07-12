import { NextResponse } from "next/server";

export async function POST(request: any) {
    try
    {
        const { firstName, middleName, lastName, fullName, email, password, phone, doj, dob, address, note, slug, image, isActive } = await request.json();
        const newProducts = { firstName, middleName, lastName, fullName, email, password, phone, doj, dob, address, note, slug, image, isActive };
        return NextResponse.json(newProducts, { status: 200 });
    }
    catch (error)
    {
        console.log(error);
        return NextResponse.json({ message: "Failed to create new Staff...!", error }, { status: 500 });
    }
}