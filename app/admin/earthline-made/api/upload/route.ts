import sharp from "sharp";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
	api_key: process.env.CLOUDINARY_API_KEY!,
	api_secret: process.env.CLOUDINARY_API_SECRET!,
});

function slugify(text: string) {
	return text
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)+/g, "");
}

export async function POST(req: Request) {
	try {
		const formData = await req.formData();

		const folderName = formData.get("folderName") as string;
		const productName = formData.get("productName") as string;
		const files = formData.getAll("files") as File[];

		if (!folderName)
			return NextResponse.json({ error: "Folder name required" }, { status: 400 });

		if (!productName)
			return NextResponse.json({ error: "Product name required" }, { status: 400 });

		if (!files || files.length === 0)
			return NextResponse.json({ error: "At least one image required" }, { status: 400 });

		const folderSlug = slugify(folderName);
		const productSlug = slugify(productName);

		const fullFolderPath = `earthline-made/${folderSlug}`;

		// 🔥 Get existing images count for this product
		const existingResources = await cloudinary.api.resources({
			type: "upload",
			prefix: `${fullFolderPath}/${productSlug}_`,
			max_results: 100,
		});

		let startIndex = existingResources.resources.length;

		const uploadedImages = [];

		for (let i = 0; i < files.length; i++) {
			const file = files[i];

			if (!file.type.startsWith("image/"))
				return NextResponse.json({ error: "Invalid file type" }, { status: 400 });

			const bytes = await file.arrayBuffer();
			const buffer = Buffer.from(bytes);

			// Compression
			const compressedBuffer = await sharp(buffer)
				.resize({ width: 1200 })
				.jpeg({ quality: 70 })
				.toBuffer();

			const uploadResult: any = await new Promise((resolve, reject) => {
				cloudinary.uploader
					.upload_stream(
						{
							folder: fullFolderPath,
							public_id: `${productSlug}_${startIndex + i + 1}`,
							overwrite: false,
							resource_type: "image",
						},
						(error, result) => {
							if (error) reject(error);
							else resolve(result);
						}
					)
					.end(compressedBuffer);
			});

			uploadedImages.push({
				public_id: uploadResult.public_id,
				secure_url: uploadResult.secure_url,
			});
		}

		return NextResponse.json({
			message: "Images uploaded successfully",
			folder: fullFolderPath,
			images: uploadedImages,
		});

	} catch (error) {
		console.error("UPLOAD ERROR:", error);
		return NextResponse.json({ error: "Upload failed" }, { status: 500 });
	}
}