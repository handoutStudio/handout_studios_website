import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const limitParam = searchParams.get("limit") || "20";

		const allowedLimits = ["5", "10", "20", "50", "100", "all"];

		if (!allowedLimits.includes(limitParam)) return NextResponse.json( { error: "Invalid limit. Use 5, 10, 20, 50, 100 or all." }, { status: 400 } );

		const limit = limitParam === "all" ? undefined : parseInt(limitParam);

		const products = await db.earthlineMadeProduct.findMany({ where: { isDeleted: false }, orderBy: { createdAt: "desc" }, take: limit, });

		const formatted = products.map((p: any) => ({
			id: p.id,
			folder: p.folder,
			product: p.product,
			description: p.description,
			images: (p.images as any[]).map((img) => ({ public_id: img.public_id, secure_url: img.secure_url.replace( "/upload/", "/upload/f_auto,q_auto,w_1000/" ), })),
			createdAt: p.createdAt,
		}));

		return NextResponse.json(formatted);
	}
    catch (error) {
		console.error("FETCH PRODUCTS ERROR:", error);
		return NextResponse.json( { error: "Failed to fetch products" }, { status: 500 } );
	}
}