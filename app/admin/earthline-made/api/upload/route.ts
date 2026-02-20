import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// 🔥 Slugify function
function slugify(text: string) { return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""); }

export async function POST(req: Request) {
    try
    {
        const formData = await req.formData();

        const file = formData.get("file") as File;
        const productName = formData.get("productName") as string;

        if (!file || !file.type.startsWith("image/")) return NextResponse.json({ error: "Invalid image file" }, { status: 400 });

        if (!productName) return NextResponse.json({ error: "Product name required" }, { status: 400 });

        const slug = slugify(productName);

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const upload = await new Promise<any>((resolve, reject) => {
            cloudinary.uploader
                .upload_stream(
                    { folder: "earthline_Products", public_id: slug, overwrite: false }, // set false if you don't want replace
                    (error, result) => { if(error) reject(error); else resolve(result); }).end(buffer);
        });

        return NextResponse.json({ message: "Uploaded", secure_url: upload.secure_url });
    }
    catch (error) { return NextResponse.json( { error: `Upload failed ${error}` }, { status: 500 }); }
}
