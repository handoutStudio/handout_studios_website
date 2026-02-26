import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({ cloud_name: process.env.CLOUDINARY_CLOUD_NAME!, api_key: process.env.CLOUDINARY_API_KEY!, api_secret: process.env.CLOUDINARY_API_SECRET!, });

export async function GET() {
	try {
		const result = await cloudinary.api.sub_folders("earthline-made");
		const folders = result.folders.map((folder: any) => ({ name: folder.name, path: folder.path, }));
		return NextResponse.json(folders);
	}
	catch (error) { console.error("Error fetching folders:", error); return NextResponse.json( { error: "Failed to fetch folders" }, { status: 500 } ); }
}