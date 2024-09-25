'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Editor from '@/components/Inputs/Editor';
import { generateSlug } from '@/app/lib/generateSlug';
import { makePostRequest } from '@/app/lib/apiRequest';
import { Loading } from '@/components/Loading/Loading';
import { TextInput } from '@/components/Inputs/TextInput';
import { Buttons } from '@/components/Inputs/SubmitButton';
import { ImageUpload } from '@/components/Inputs/ImageUpload';
import { Alerts } from '@/components/Inputs/AlertsAndSnackBars/Alerts';
import { Snackbars } from '@/components/Inputs/AlertsAndSnackBars/Snackbars';
import { Card, CardActions, CardContent, CardHeader, Chip } from '@mui/material';
import { AddCircleRounded, Category, CloseRounded, DescriptionRounded, EditNoteRounded, LocalLibraryRounded, PublishRounded } from '@mui/icons-material';


export default function NewProducts() {
	
	const router = useRouter();
	const fileRef = React.useRef();
	const [getTitle, setTitle] = React.useState('');
	const [getOpen, setOpen] = React.useState(false);
	const [getError, setError] = React.useState(false);
	const [getActive, setActive] = React.useState(false);
	const [getIsLoading, setIsLoading] = React.useState(true);
	const [getDescription, setDescription] = React.useState('');
	const [getSelectCategory, setSelectCategory] = React.useState([]);
	const [submittedContent, setSubmittedContent] = React.useState("");
	const [getApiResponse, setApiResponse] = React.useState({ message: '', color: '' });

	const handleChange = (event: any) => {

		const { name, value, checked } = event.target;

		switch (name) {
			case 'title': setTitle(value); break;
			case 'description': setDescription(value); break;
			case 'selectC': setSelectCategory(value); break;
			case 'active': setActive(checked); break;
			default: break;
		}
		setError(false);
	};
	
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		if(getTitle === '' || getDescription === '') setError(!getError); 
		else
		{
			setIsLoading(true);
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
			cleanUp();
			setApiResponse(apiResponse!);
			setOpen(true);

			setTimeout(() => {
				router.back();
			}, 2000);
		}
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


	const cleanUp = () => {
		setTitle('');
		setActive(false);
		setDescription('');
		setSelectCategory([]);
		setSubmittedContent("");
	}

	return (
		<div className={`w-full flex justify-center items-center min-[950px]:p-5 p-2`}>
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
			{
				getIsLoading
				?
					(<Loading setIsLoading={setIsLoading} />)
				:
					(
						<>
							<Card className={`flex min-[950px]:w-3/4 w-full flex-col rounded-lg bg-red-50 gap-5`}>
								
								<CardHeader className={`flex justify-center items-center py-3 px-5 w-full rounded-tl-lg rounded-tr-lg bg-red-300 max-[600px]:flex-col`} title="Add New Training" />

								<CardContent className={`flex flex-col justify-center items-start w-full px-12 py-6 gap-5`}>

									<Alerts getError={getError} setError={setError} alertMessage={`Please Fill all the Required Fields to Proceed...!`} />

									<div className={`flex justify-center items-start w-full gap-5 max-[950px]:flex-col`}>
										<TextInput handleChange={handleChange} getValue={getTitle} placeholder={'Training Title...!'} id={'title'} name={'title'} label={"Training Title"} component={'text'} icon={<LocalLibraryRounded />} />
										<TextInput handleChange={handleChange} getValue={getSelectCategory} placeholder={'Training Category...!'} id={'selectC'} name={'selectC'} label={"Training Category"} component={'selectMulti'} icon={<Category />} selectMenu={selectMenuDataCategory} />
									</div>

									<div className={`flex justify-center items-center gap-5 z-0 w-full max-[950px]:flex-col`}>
										<TextInput getValue={getDescription} handleChange={handleChange} placeholder={'Training Description...!'} id={'description'} name={'description'} label={"Training Description"} component={'textArea'} icon={<DescriptionRounded fontSize='large' />} />
									
										<ImageUpload maxFileSize={1048576} limit={1} fileRef={ fileRef } dropzoneText={"Drag and drop an image here or click to upload Product Image...!"} showPreviewsInDropzone={true} showPreviews={false} />
									</div>
									
									<div className={`w-full`}>
										<Editor submittedContent={submittedContent} setSubmittedContent={setSubmittedContent} />
									</div>

								</CardContent>

								<CardActions className={`flex justify-between items-center max-[950px]:flex-col gap-5 w-full`}>
									<div className={`flex justify-start items-start flex-col min-[569px]:flex-row w-full ml-8 mb-8 gap-5`}>
										<TextInput getValue={getActive} handleChange={handleChange} id={'active'} name={'active'} label={"Publish Your Training...?"} component={'switch'} />
										<Chip color={ getActive ? 'error' : 'warning' } label={ getActive ? 'Publish' : 'Draft' } onDelete={() => { setActive(!getActive) }} deleteIcon={ getActive ? <PublishRounded fontSize='small' /> : <EditNoteRounded fontSize='small' /> } />
									</div>
									<div className={`flex min-[569px]:justify-end justify-center min-[569px]:items-end items-center min-[569px]:mr-8 mb-8 w-full gap-5`}>
										<Buttons classes={'cancel'} startIcon={<CloseRounded />} endIcon={null} size={'large'} buttonText={'Cancel'} />
										<Buttons classes={'submit'} handleSubmit={(e: any) => handleSubmit (e)} startIcon={null} endIcon={<AddCircleRounded />} size={'large'} buttonText={'Save'} />
									</div>
								</CardActions>
							</Card>
							<Snackbars getOpen={getOpen} getApiResponse={getApiResponse} />
						</>
					)
			}
		</div>
	)
}
