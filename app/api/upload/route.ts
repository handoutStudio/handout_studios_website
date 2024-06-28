import { mkdir, stat, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	
	const data = await request.formData();
	const file: File | null = data.get('file') as unknown as File
	const folder: string | null = data.get('folder') as unknown as string;
	const name: string | null = data.get('name') as unknown as string;

	if (!file) return NextResponse.json({ success: false });

	console.log(file);
	const bytes = await file.arrayBuffer();
	const buffer = Buffer.from(bytes);

	// With the file data in the buffer, you can do whatever you want with it.
	// For this, we'll just write it to the filesystem in a new location
	try
	{
		await stat(process.env.SERVER_IMAGE_PATH + folder);
	}
	catch(e: any)
	{
		mkdir(process.env.SERVER_IMAGE_PATH + folder);
	}
	const path = process.env.SERVER_IMAGE_PATH + folder + name + file.type.replace("image/", ".");
	await writeFile(path, buffer);


	return NextResponse.json({ success: true, message: path });
}