'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { generateSlug } from '@/app/lib/generateSlug';
import { makePostRequest } from '@/app/lib/apiRequest';
import { TextInput } from '@/components/Inputs/TextInput';
import { Buttons } from '@/components/Inputs/SubmitButton';
import { ImageUpload } from '@/components/Inputs/ImageUpload';
import { Alerts } from '@/components/Inputs/AlertsAndSnackBars/Alerts';
import { Card, CardActions, CardContent, CardHeader } from '@mui/material';
import { Snackbars } from '@/components/Inputs/AlertsAndSnackBars/Snackbars';
import { AddCircleRounded, CloseRounded, DescriptionRounded, StyleRounded } from '@mui/icons-material';


export default function NewCategory() {
	
	const router = useRouter();
	const fileRef = React.useRef();
	const [getTitle, setTitle] = React.useState('');
	const [getOpen, setOpen] = React.useState(false);
	const [getSelect, setSelect] = React.useState([]);
	const [getError, setError] = React.useState(false);
	const [getLoading, setLoading] = React.useState(false);
	const [getIsActive, setIsActive] = React.useState(true);
	const [getDescription, setDescription] = React.useState('');
	const [getApiResponse, setApiResponse] = React.useState({ message: '', color: '' });

	const handleChange = (event: any) => { event.target.name === 'title' ? (setTitle(event.target.value), setError(false)) : event.target.name === 'description' ? (setDescription(event.target.value), setError(false)) : event.target.name === 'active' ? (setIsActive(!getIsActive), setError(false)) : (setSelect(event.target.value), setError(false)) };
	
	const handleSubmit = async (e: any) => {
		setLoading(!getLoading);
		e.preventDefault();
		if(getTitle === '' || getDescription === '') setError(!getError); 
		else
		{
			const slug = generateSlug(getTitle);
			const response = await uploadImage(fileRef.current?.[0])
				.then((response: any) => response.json())
				.then((data: any) => { return data.message })
				.catch((error: any) => console.log(error));

			const imagePath = response.substring(response.indexOf('/public'), response.length);
			const categoryData = { title: getTitle, description: getDescription, slug: slug, image: imagePath, market: getSelect, isActive: getIsActive  };
			const apiResponse = await makePostRequest('http://localhost:3000/api/categories', categoryData, 'Category');
			setApiResponse(apiResponse!);
			setOpen(!getOpen);

			setTimeout(() => {
				setOpen(!getOpen);
				router.back();
			}, 2000);
		}
		setLoading(!getLoading);
	}

	const uploadImage = async (fileRef: any) =>
	{
		try
		{
			const data = new FormData();
			data.set('file', fileRef);
			data.set('folder', 'Category/');
			data.set('name', getTitle);

			const res = await fetch('/api/upload', {
				method: 'POST',
				body: data
			});

			if(!res.ok) throw new Error(await res.text());

			return res;
		}
		catch(error: any) { console.log(error); }
	}

	// const selectMenuData = ['One', 'Two', 'Three'];



	return (
		<div className={`w-full flex justify-center items-center min-[950px]:p-5 p-2`}>
			{/* 
				- id => auto()
				- title => userInput()
				- slug => auto()
				- description => userInput()
				- market => userInput()
				- image => userInput()
			*/}
			<Card className={`flex min-[950px]:w-3/4 w-full flex-col rounded-lg bg-red-50 gap-5`}>

				<CardHeader className={`flex justify-center items-center py-3 px-5 w-full rounded-tl-lg rounded-tr-lg bg-red-300 max-[600px]:flex-col`} title="Add New Category" />
				<CardContent className={`flex flex-col justify-center items-start w-full px-12 py-6 gap-5`}>
					
					<Alerts getError={getError} setError={setError} alertMessage={`Please Fill all the Required Fields to Proceed...!`} />
					
					<div className={`flex justify-center items-start w-full gap-5 max-[950px]:flex-col`}>
						<TextInput handleChange={handleChange} getValue={getTitle} placeholder={'Category Title...!'} id={'title'} name={'title'} label={"Category"} component={'text'} icon={<StyleRounded />} />
						{/* <TextInput handleChange={handleChange} getValue={getSelect} placeholder={'Select Market...!'} id={'select'} name={'select'} label={"Select Market"} component={'select'} icon={<Store />} selectMenu={selectMenuData} /> */}
					</div>

					<div className={`flex justify-center items-start w-full gap-5 max-[950px]:flex-col`}>
						<TextInput getValue={getDescription} handleChange={handleChange} placeholder={'Category Description...!'} id={'description'} name={'description'} label={"Description"} component={'textArea'} icon={<DescriptionRounded fontSize='large' />} />
						<ImageUpload maxFileSize={1048576} limit={1} fileRef={ fileRef } dropzoneText={"Drag and drop an image here or click to upload Category Image...!"} showPreviewsInDropzone={false} showPreviews={true} />
					</div>

				</CardContent>
				<CardActions className={`flex justify-between items-center max-[950px]:flex-col gap-5 w-full`}>
					<div className={`flex justify-start items-start flex-col w-full ml-8 mb-8 gap-5`}>
						<TextInput getValue={getIsActive} handleChange={handleChange} id={'active'} name={'active'} label={ getIsActive ? "Active...?" : "Disabled...!"} component={'switch'} />
					</div>
					<div className={`flex min-[569px]:justify-end justify-center min-[569px]:items-end items-center min-[569px]:mr-8 mb-8 w-full gap-5`}>
						<Buttons classes={'cancel'} startIcon={<CloseRounded />} endIcon={null} size={'large'} buttonText={'Cancel'} />
						<Buttons classes={'submit'} handleSubmit={(e: any) => handleSubmit (e)} startIcon={null} endIcon={<AddCircleRounded />} size={'large'} buttonText={'Save'} />
					</div>
				</CardActions>
			</Card>

			<Snackbars getOpen={getOpen} getApiResponse={getApiResponse} />
		</div>
	)
}
