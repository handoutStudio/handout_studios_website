import { NextResponse } from "next/server";

export async function POST(request: any) {
    try
    {
        const { title, selectCategory, selectSeller, sku, quantity, barcode, productPrice, salePrice, slug, tags, description, image, isActive } = await request.json();
        const newCommunity = { title, selectCategory, selectSeller, sku, quantity, barcode, productPrice, salePrice, slug, tags, description, image, isActive };
        return NextResponse.json(newCommunity, { status: 200 });
    }
    catch (error)
    {
        console.log(error);
        return NextResponse.json({ message: "Failed to create new Community...!", error }, { status: 500 });
    }
}