import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
    try {
        const { folderName, productName } = await req.json();

        const prefix = `earthline-made/${folderName}/${productName}_`;

        const resources = await cloudinary.api.resources({
            type: "upload",
            prefix,
            max_results: 100,
        });

        const publicIds = resources.resources.map((r:any) => r.public_id);

        if (publicIds.length > 0) {
            await cloudinary.api.delete_resources(publicIds);
        }

        return NextResponse.json({ message: "Deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Delete failed" }, { status: 500 });
    }
}