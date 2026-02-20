// import { NextResponse } from 'next/server';
// import fs from 'fs';
// import path from 'path';

// export async function GET() {
// 	try {
// 		const dirPath = path.join(process.cwd(), 'public', 'images', 'products');
// 		const files = fs.readdirSync(dirPath);

// 		const images = files.filter(file =>
// 			/\.(jpg|jpeg|png|svg|webp)$/i.test(file)
// 		);

// 		const dirPathT = path.join(process.cwd(), 'public', 'captions', 'products');
// 		const filesT = fs.readdirSync(dirPathT);

// 		const captions = filesT.filter(file =>
// 			/\.(txt|md)$/i.test(file)
// 		);

// 		return NextResponse.json({ images, captions });

// 		// return NextResponse.json({ images });
// 	} catch (err) {
// 		console.error('Error reading product images:', err);
// 		return NextResponse.json({ images: [] }, { status: 500 });
// 	}
// }

import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const imagesDir = path.join(process.cwd(), 'public', 'images', 'products');
		const captionsDir = path.join(process.cwd(), 'public', 'captions', 'products');

		const imageFiles = fs.readdirSync(imagesDir).filter(file => /\.(jpg|jpeg|png|svg|webp)$/i.test(file) );

		const captionFiles = fs.readdirSync(captionsDir).filter(file => /\.(txt|md)$/i.test(file) );

		const data = imageFiles.map(image => {
			const baseName = path.parse(image).name;

			const captionFile = captionFiles.find(file => path.parse(file).name === baseName);
			let captionText = '';

			if (captionFile) {
				try {
					const captionPath = path.join(captionsDir, captionFile);
					captionText = fs.readFileSync(captionPath, 'utf-8').trim();
				} catch (err) {
					console.warn(`Could not read caption for ${image}:`, err);
				}
			}

			return {
				image,
				caption: captionText || null
			};
		});

		return NextResponse.json({ data });

	} catch (err) {
		console.error('Error reading product data:', err);
		return NextResponse.json({ data: [] }, { status: 500 });
	}
}
