
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({ cloud_name: process.env.CLOUDINARY_CLOUD_NAME!, api_key: process.env.CLOUDINARY_API_KEY!, api_secret: process.env.CLOUDINARY_API_SECRET! });

export async function GET() {
	try {
		const result = await cloudinary.search
			.expression("folder:earthline_Products")
			.sort_by("created_at", "desc")
			.max_results(500)
			.execute();

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const images: string[] = result.resources.map((resource: any) => resource.secure_url);

		return NextResponse.json(images);
	}
	catch (error) { return NextResponse.json({ error: `Failed to fetch images from Cloudinary: ${error}` }, { status: 500 }); }
}
