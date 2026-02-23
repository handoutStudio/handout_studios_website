// 'use client';

// import * as React from 'react';
// import { DropzoneArea } from "mui-file-dropzone";

// export function ImageUpload({limit, fileRef, dropzoneText, showPreviewsInDropzone, showPreviews, maxFileSize}: any) {

// 	const [getFileUploadState, setFileUploadState] = React.useState([]);

// 	React.useEffect(() => {
// 		fileRef.current = getFileUploadState;
// 	}, [getFileUploadState, fileRef]);

// 	const handleSave = (files: any) => {
// 		setFileUploadState(files);
// 		fileRef.current = getFileUploadState;
// 	}
// 	const handleAdd = (newFileObjects: any) => {
// 		setFileUploadState([].concat(getFileUploadState, newFileObjects));
// 		fileRef.current = getFileUploadState;
// 	}
	
// 	return (
// 		<div className={`w-full`}>
// 			<DropzoneArea
// 				fileObjects={getFileUploadState}
// 				onAdd={handleAdd}
// 				showPreviews={showPreviews}
// 				acceptedFiles={['image/*']}
// 				showFileNamesInPreview={true}
// 				showPreviewsInDropzone={showPreviewsInDropzone}
// 				onChange={(files: any) => handleSave(files)}
// 				filesLimit={limit}
// 				dropzoneText={dropzoneText}
// 				maxFileSize={maxFileSize}
// 			/>
// 		</div>
// 	)
// }





'use client';

import * as React from 'react';
import { DropzoneArea } from "mui-file-dropzone";

export function ImageUpload({ limit, fileRef, dropzoneText, showPreviewsInDropzone, showPreviews, maxFileSize }: any) {

	const [files, setFiles] = React.useState<File[]>([]);

	React.useEffect(() => {
		fileRef.current = files;
	}, [files, fileRef]);

	const handleChange = (newFiles: File[]) => {
		setFiles(newFiles);
	};

	return (
		<div className="w-full">
			<DropzoneArea
				onChange={handleChange}
				showPreviews={showPreviews}
				acceptedFiles={['image/*']}
				showFileNamesInPreview
				showPreviewsInDropzone={showPreviewsInDropzone}
				filesLimit={limit}
				dropzoneText={dropzoneText}
				maxFileSize={maxFileSize}
			/>
		</div>
	);
}