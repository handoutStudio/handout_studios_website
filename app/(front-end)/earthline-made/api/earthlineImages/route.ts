// import fs from "fs";
// import path from "path";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// // Local Testing Environment
// function getAllImages(dirPath: string, basePath: string): string[] {
// 	let results: string[] = [];

// 	const files = fs.readdirSync(dirPath);

// 	for (const file of files) {
// 		const fullPath = path.join(dirPath, file);
// 		const stat = fs.statSync(fullPath);

// 		if (stat.isDirectory()) {
// 			// Recursively scan subfolder
// 			results = results.concat(getAllImages(fullPath, basePath));
// 		}
// 		else if (/\.(png|jpg|jpeg|webp)$/i.test(file)) {
// 			// Convert absolute path → public URL
// 			const relativePath = fullPath
// 				.replace(path.join(process.cwd(), "public"), "")
// 				.replace(/\\/g, "/"); // Fix Windows slashes

// 			results.push(relativePath);
// 		}
// 	}

// 	return results;
// }

// export async function GET() {
// 	try
// 	{
// 		const rootDirectory = path.join(process.cwd(), "public", "images", "earthline_Products");
// 		const images = getAllImages(rootDirectory, "earthline_Products");
// 		return NextResponse.json(images);
// 	}
// 	catch (error) { return NextResponse.json({ error: error }, { status: 500 }); }
// }


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
