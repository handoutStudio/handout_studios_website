import { NextResponse } from "next/server";

export async function POST(request: any) {
    try
    {
        const { title, slug, phone, email, contactPerson, address, payment, notes } = await request.json();
        const newSeller = { title, slug, phone, email, contactPerson, address, payment, notes };
        return NextResponse.json(newSeller, { status: 200 });
    }
    catch (error)
    {
        console.log(error);
        return NextResponse.json({ message: "Failed to create new Seller...!", error }, { status: 500 });
    }
}