import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function GET() {
    try {
        const result = await cloudinary.search
            .expression("folder:earthline-made/*")
            .sort_by("created_at", "desc")
            .max_results(500)
            .execute();

        const structured: Record<string, any> = {};

        for (const resource of result.resources) {
            const publicId: string = resource.public_id;
            // Example: earthline-made/vase-trio/product_1

            const parts = publicId.split("/");

            if (parts.length < 3) continue;

            const folderName = parts[1];
            const fileName = parts[2]; // product_1

            const productBase = fileName.replace(/_\d+$/, ""); // remove index

            if (!structured[folderName]) {
                structured[folderName] = {};
            }

            if (!structured[folderName][productBase]) {
                structured[folderName][productBase] = {
                    folder: folderName,
                    product: productBase,
                    images: [],
                };
            }

            structured[folderName][productBase].images.push({
                url: resource.secure_url.replace(
                    "/upload/",
                    "/upload/f_auto,q_auto,w_1000/"
                ),
                public_id: resource.public_id,
            });
        }

        // Convert object → array
        const formatted = Object.values(structured).flatMap((folder: any) =>
            Object.values(folder)
        );

        return NextResponse.json(formatted);

    } catch (error) {
        console.error("FETCH PRODUCTS ERROR:", error);
        return NextResponse.json(
            { error: "Failed to fetch products" },
            { status: 500 }
        );
    }
}