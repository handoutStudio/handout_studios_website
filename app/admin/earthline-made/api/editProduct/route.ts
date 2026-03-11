import sharp from "sharp";
import db from "@/app/lib/db";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({ cloud_name: process.env.CLOUDINARY_CLOUD_NAME!, api_key: process.env.CLOUDINARY_API_KEY!, api_secret: process.env.CLOUDINARY_API_SECRET!, });

const slugify = (text: string) => text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

export async function PATCH(req: Request) {
	try {
		const formData = await req.formData();

		const id = formData.get("id") as string;
		const folderName = formData.get("folderName") as string;
		const productName = formData.get("productName") as string;
		const description = formData.get("productDescription") as string;

		const existingImages = JSON.parse( formData.get("existingImages") as string ) as { public_id: string; secure_url: string }[];

		const files = formData.getAll("files") as File[];

		if (!id) return NextResponse.json({ error: "Product ID required" }, { status: 400 });

		const product = await db.earthlineMadeProduct.findUnique({ where: { id }, });

		if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });

		const oldFolder = product.folder;
		const newFolder = folderName ? slugify(folderName) : oldFolder;

		const oldSlug = slugify(product.product);
		const newSlug = productName ? slugify(productName) : oldSlug;

		const oldPath = `earthline-made/${oldFolder}`;
		const newPath = `earthline-made/${newFolder}`;

		let updatedImages: any[] = [];

		/* -------------------------------- */
		/* DELETE REMOVED IMAGES            */
		/* -------------------------------- */

		const oldImages = product.images as any[];

		const removedImages = oldImages.filter( (img) => !existingImages.some((i) => i.public_id === img.public_id) );

		for (const img of removedImages) await cloudinary.uploader.destroy(img.public_id);

		/* -------------------------------- */
		/* RENAME / MOVE EXISTING IMAGES    */
		/* -------------------------------- */

		for (let i = 0; i < existingImages.length; i++) {
			const img = existingImages[i];
			const newPublicId = `${newPath}/${newSlug}_${i + 1}`;
			if (img.public_id !== newPublicId) {
				const result = await cloudinary.uploader.rename(img.public_id, newPublicId, { overwrite: true, });
				updatedImages.push({ public_id: result.public_id, secure_url: result.secure_url, });
			}
			else updatedImages.push(img);
		}

		/* -------------------------------- */
		/* UPLOAD NEW IMAGES                */
		/* -------------------------------- */

		let startIndex = updatedImages.length;

		for (let i = 0; i < files.length; i++) {
			const file = files[i];

			if (!file.type.startsWith("image/")) return NextResponse.json( { error: "Invalid file type" }, { status: 400 } );

			const buffer = Buffer.from(await file.arrayBuffer());

			const compressed = await sharp(buffer).resize({ width: 1200 }).jpeg({ quality: 70 }).toBuffer();

			const uploadResult: any = await new Promise((resolve, reject) => {
				cloudinary.uploader
					.upload_stream(
						{ folder: newPath, public_id: `${newSlug}_${startIndex + i + 1}`, overwrite: false, resource_type: "image", },
						(err, result) => { err ? reject(err) : resolve(result); }
					)
					.end(compressed);
			});

			updatedImages.push({ public_id: uploadResult.public_id, secure_url: uploadResult.secure_url, });
		}

		/* -------------------------------- */
		/* UPDATE DATABASE                  */
		/* -------------------------------- */

		const updatedProduct = await db.earthlineMadeProduct.update({
			where: { id },
			data: { folder: newFolder, product: productName ?? product.product, description: description ?? product.description, images: updatedImages, },
		});

		return NextResponse.json({ message: "Product updated successfully", product: updatedProduct, });
	}
	catch (error) {
		console.error("EDIT PRODUCT ERROR:", error);
		return NextResponse.json( { error: "Failed to update product" }, { status: 500 } );
	}
}