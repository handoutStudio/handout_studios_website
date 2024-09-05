'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { generateSlug } from '@/app/lib/generateSlug';
import { makePostRequest } from '@/app/lib/apiRequest';
import { TextInput } from '@/components/Inputs/TextInput';
import { Buttons } from '@/components/Inputs/SubmitButton';
import { Alert, AlertTitle, Snackbar } from '@mui/material';
import { ImageUpload } from '@/components/Inputs/ImageUpload';
import { PageHeader } from '@/components/backoffice/PageHeader';
import { AddCircleRounded, CloseRounded, NotesRounded, PersonPinCircleRounded } from '@mui/icons-material';


export default function NewMarket() {
	

	const router = useRouter();
	const fileRef = React.useRef();
	const [getOpen, setOpen] = React.useState(false);
	const [getTitle, setTitle] = React.useState('');
	const [getError, setError] = React.useState(false);
	const [getLoading, setLoading] = React.useState(false);
	const [getDescription, setDescription] = React.useState('');
	const [getApiResponse, setApiResponse] = React.useState({ message: '', color: '' });

	const handleChange = (event: any) => event.target.name === 'name' ? (setTitle(event.target.value), setError(false)) : (setDescription(event.target.value), setError(false));
	
	const handleSubmit = async (e: any) => {
		setLoading(!getLoading);
		e.preventDefault();
		if(getTitle === '') setError(!getError); 
		else
		{
			const slug = generateSlug(getTitle);
			const response = await uploadImage(fileRef.current?.[0])
				.then((response: any) => response.json())
				.then((data: any) => { return data.message })
				.catch((error: any) => console.log(error));

			const imagePath = response.substring(response.indexOf('/public'), response.length);
			const marketData = { title: getTitle, slug: slug, logo: imagePath, description: getDescription };
			console.log(marketData);
			const apiResponse = await makePostRequest('http://localhost:3000/api/markets', marketData, 'Market');
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
			data.set('folder', 'Markets/');
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


	return (
		<div className={`flex flex-col justify-center items-center w-full gap-8`}>
			{/* 
				- id => auto()
				- title => userInput()
				- slug => auto()
				- logo => userInput()
				- description => userInput()
			*/}
			<div className={`flex flex-col w-[90%] rounded-lg bg-red-50 gap-5`}>
				<PageHeader pageTitle={'Add New Market'} link={null} buttonText={null} />
				<div className={`flex flex-col justify-center items-start w-full px-12 py-6 gap-5`}>

					<TextInput handleChange={handleChange} getValue={getTitle} placeholder={'Market Name...!'} id={'name'} name={'name'} label={"Market"} component={'text'} icon={<PersonPinCircleRounded />} />
					<ImageUpload maxFileSize={1000000} limit={1} fileRef={ fileRef } dropzoneText={"Drag and drop an image here or click to upload Market Logo...!"} showPreviewsInDropzone={true} showPreviews={false} />
					<TextInput handleChange={handleChange} getValue={getDescription} placeholder={'Market Description...!'} id={'description'} name={'description'} label={"Description"} component={'textArea'} icon={<NotesRounded fontSize='large' />} rows={6} />

					<div className={`flex justify-between items-center max-[600px]:flex-col gap-5 w-full`}>
						<Alert className={getError ? '' : 'invisible'} variant="filled" severity="error">{`Please Fill all the Required Fields to Proceed...!`}</Alert>
						<div className={`flex gap-5`}>
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
