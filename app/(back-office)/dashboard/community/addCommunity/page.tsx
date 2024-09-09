'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Editor from '@/components/Inputs/Editor';
import { generateSlug } from '@/app/lib/generateSlug';
import { makePostRequest } from '@/app/lib/apiRequest';
import { TextInput } from '@/components/Inputs/TextInput';
import { Buttons } from '@/components/Inputs/SubmitButton';
import { ImageUpload } from '@/components/Inputs/ImageUpload';
import { PageHeader } from '@/components/backoffice/PageHeader';
import { Alert, AlertTitle, Chip, Snackbar } from '@mui/material';
import { AddCircleRounded, Category, CloseRounded, DescriptionRounded, EditNoteRounded, LocalLibraryRounded, PublishRounded } from '@mui/icons-material';


export default function NewProducts() {
	
	const router = useRouter();
	const fileRef = React.useRef();
	const [getTitle, setTitle] = React.useState('');
	const [getOpen, setOpen] = React.useState(false);
	const [getError, setError] = React.useState(false);
	const [getActive, setActive] = React.useState(false);
	const [getLoading, setLoading] = React.useState(false);
	const [getDescription, setDescription] = React.useState('');
	const [getSelectCategory, setSelectCategory] = React.useState([]);
	const [submittedContent, setSubmittedContent] = React.useState("");
	const [getApiResponse, setApiResponse] = React.useState({ message: '', color: '' });

	const handleChange = (event: any) => {

		switch (event.target.name) {
			case 'title':
				setTitle(event.target.value);
				setError(false);
				break;
			case 'description':
				setDescription(event.target.value);
				setError(false);
				break;
			case 'selectC':
				setSelectCategory(event.target.value);
				setError(false);
				break;
			case 'active':
				setActive(event.target.checked);
				setError(false);
				break;
			default:
				break;
		}
	};
	
	const handleSubmit = async (e: any) => {
		setLoading(!getLoading);
		e.preventDefault();
		if(getTitle === '' || getDescription === '') setError(!getError); 
		else
		{
			const slug = generateSlug(getTitle);
			
			const fileArrays: any = fileRef.current;
			let response:any = '';
			for(let i = 0; i < fileArrays.length; i++)
			{
				response += (await uploadImage(fileRef.current?.[i], i)
				.then((response: any) => response.json())
				.then((data: any) => { return data.message })
				.catch((error: any) => console.log(error)) + ', ');
			}
			response = response.split(", ");
			response.pop();
			let imagePath: any = [];
			response.forEach((element: string) => {
				imagePath.push(element.substring(element.indexOf('/public'), element.length));
			});

			const communityData = { title: getTitle, slug: slug, description: getDescription, image: imagePath, content: submittedContent, selectCategory: getSelectCategory, isActive: getActive };
			const apiResponse = await makePostRequest('http://localhost:3000/api/community', communityData, 'Community');
			setApiResponse(apiResponse!);
			setOpen(!getOpen);

			setTimeout(() => {
				setOpen(!getOpen);
				router.back();
			}, 2000);
		}
		setLoading(!getLoading);
	}

	const uploadImage = async (fileRef: any, index: number) =>
	{
		try
		{
			const data = new FormData();
			data.set('file', fileRef);
			data.set('folder', 'Community/');
			data.set('name', getTitle + index);

			const res = await fetch('/api/upload', {
				method: 'POST',
				body: data
			});

			if(!res.ok) throw new Error(await res.text());
			return res;
		}
		catch(error: any) { console.log(error); }
	}

	const selectMenuDataCategory = ['One', 'Two', 'Three'];

	return (
		<div className={`flex flex-col justify-center items-center w-full gap-8`}>
			{/* 
				- id => auto()
				- title => userInput()
				- expertId => auto()
				- Category => userInput()
				- slug => auto()
				- description => userInput()
				- image => userInput()
				- content => userInput() [RichTextBox]
			*/}
			<div className={`flex flex-col w-[90%] rounded-lg bg-red-50 gap-5`}>
				<PageHeader pageTitle={'Add New Training'} link={null} buttonText={null} />
				<div className={`flex flex-col justify-center items-start w-full px-12 py-6 gap-5`}>

					<div className={`flex justify-center items-start w-full gap-5 max-[570px]:flex-col`}>
						<TextInput handleChange={handleChange} getValue={getTitle} placeholder={'Training Title...!'} id={'title'} name={'title'} label={"Training Title"} component={'text'} icon={<LocalLibraryRounded />} />
						<TextInput handleChange={handleChange} getValue={getSelectCategory} placeholder={'Training Category...!'} id={'selectC'} name={'selectC'} label={"Training Category"} component={'selectMulti'} icon={<Category />} selectMenu={selectMenuDataCategory} />
					</div>

					<TextInput getValue={getDescription} handleChange={handleChange} placeholder={'Training Description...!'} id={'description'} name={'description'} label={"Training Description"} component={'textArea'} icon={<DescriptionRounded fontSize='large' />} />
					
					<div className={`z-0 w-full`}>
						<ImageUpload maxFileSize={1048576} limit={1} fileRef={ fileRef } dropzoneText={"Drag and drop an image here or click to upload Product Image...!"} showPreviewsInDropzone={true} showPreviews={false} />
					</div>
					
					<div className={`w-full`}>
						<Editor submittedContent={submittedContent} setSubmittedContent={setSubmittedContent} />
					</div>

					<div className={`flex justify-start items-center gap-2`}>
						<TextInput getValue={getActive} handleChange={handleChange} id={'active'} name={'active'} label={"Publish Your Training...?"} component={'switch'} />
						<Chip color={ getActive ? 'error' : 'warning' } label={ getActive ? 'Publish' : 'Draft' } onDelete={() => { setActive(!getActive) }} deleteIcon={ getActive ? <PublishRounded fontSize='small' /> : <EditNoteRounded fontSize='small' /> } />
					</div>
					
					<div className={`flex justify-between items-center max-[600px]:flex-col gap-5 w-full`}>
						<Alert className={getError ? '' : 'invisible hidden'} variant="filled" severity="error">{`Please Fill all the Required Fields to Proceed...!`}</Alert>
						<div className={`flex justify-end w-full gap-5`}>
							<Buttons classes={'cancel'} startIcon={<CloseRounded />} endIcon={null} size={'large'} buttonText={'Cancel'} />
							<Buttons classes={'submit'} handleSubmit={(e: any) => handleSubmit (e)} startIcon={null} endIcon={<AddCircleRounded />} size={'large'} buttonText={'Save'} />
						</div>
					</div>

				</div>
			</div>

			<Snackbar open={getOpen} autoHideDuration={1000} anchorOrigin={{ vertical: 'top', horizontal:'center' }}>
				<Alert variant="filled" severity={ getApiResponse.color.toLocaleLowerCase() === "success" ? "success" : getApiResponse.color.toLocaleLowerCase() === "warning" ? "warning" : "error" }>
					<AlertTitle>{getApiResponse.color}</AlertTitle>
					{getApiResponse.message}
				</Alert>
			</Snackbar>
			
		</div>
	)
}
