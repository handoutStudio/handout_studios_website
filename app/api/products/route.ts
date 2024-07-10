import { NextResponse } from "next/server";

export async function POST(request: any) {
    try
    {
        const { title, selectCategory, selectSeller, sku, quantity, barcode, productPrice, salePrice, slug, tags, description, image } = await request.json();
        const newProducts = { title, selectCategory, selectSeller, sku, quantity, barcode, productPrice, salePrice, slug, tags, description, image };
        return NextResponse.json(newProducts, { status: 200 });
    }
    catch (error)
    {
        console.log(error);
        return NextResponse.json({ message: "Failed to create new Product...!", error }, { status: 500 });
    }
}