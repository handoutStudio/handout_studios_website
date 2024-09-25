'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { generateSlug } from '@/app/lib/generateSlug';
import { makePostRequest } from '@/app/lib/apiRequest';
import { Loading } from '@/components/Loading/Loading';
import { TextInput } from '@/components/Inputs/TextInput';
import { Buttons } from '@/components/Inputs/SubmitButton';
import { ImageUpload } from '@/components/Inputs/ImageUpload';
import { Alerts } from '@/components/Inputs/AlertsAndSnackBars/Alerts';
import { Card, CardActions, CardContent, CardHeader } from '@mui/material';
import { Snackbars } from '@/components/Inputs/AlertsAndSnackBars/Snackbars';
import { AddCircleRounded, Category, CloseRounded, NotesRounded, PersonPinCircleRounded } from '@mui/icons-material';


export default function NewMarket() {
	

	const router = useRouter();
	const fileRef = React.useRef();
	const [getTitle, setTitle] = React.useState('');
	const [getOpen, setOpen] = React.useState(false);
	const [getError, setError] = React.useState(false);
	const [getIsActive, setIsActive] = React.useState(true);
	const [getIsLoading, setIsLoading] = React.useState(true);
	const [getDescription, setDescription] = React.useState('');
	const [getSelectCategory, setSelectCategory] = React.useState([]);
	const [getApiResponse, setApiResponse] = React.useState({ message: '', color: '' });

	const handleChange = (event: any) =>
	{
		const { name, value, checked } = event.target;

		switch (name) {
			case 'name': setTitle(value); break;
			case 'selectC': setSelectCategory(value); break;
			case 'description': setDescription(value); break;
			case 'active': setIsActive(checked); break;
			default: break;
		}
	}
	
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		if(getTitle === '') setError(!getError); 
		else
		{
			setIsLoading(true)
			const slug = generateSlug(getTitle);
			const response = await uploadImage(fileRef.current?.[0])
				.then((response: any) => response.json())
				.then((data: any) => { return data.message })
				.catch((error: any) => console.log(error));

			const imagePath = response.substring(response.indexOf('/public'), response.length);
			const marketData = { title: getTitle, slug: slug, logo: imagePath, description: getDescription, selectCategory: getSelectCategory, isActive: getIsActive };
			console.log(marketData);
			const apiResponse = await makePostRequest('http://localhost:3000/api/markets', marketData, 'Market');
			cleanUp();
			setApiResponse(apiResponse!);
			setOpen(true);

			setTimeout(() => {
				router.back();
			}, 2000);
		}
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

	const selectMenuDataCategory = ['One', 'Two', 'Three'];

	const cleanUp = () => {
		setTitle('');
		setIsActive(true);
		setDescription('');
		setSelectCategory([]);
	}


	return (
		<div className={`w-full flex justify-center items-center min-[950px]:p-5 p-2`}>
			{/* 
				- id => auto()
				- title => userInput()
				- slug => auto()
				- logo => userInput()
				- description => userInput()
				- isActive => userInput()
			*/}
			{
				getIsLoading
				?
					(<Loading setIsLoading={setIsLoading} />)
				:
					(
						<>
							<Card className={`flex min-[950px]:w-3/4 w-full flex-col rounded-lg bg-red-50 gap-5`}>
								
								<CardHeader className={`flex justify-center items-center py-3 px-5 w-full rounded-tl-lg rounded-tr-lg bg-red-300 max-[600px]:flex-col`} title="Add New Market" />
								
								<CardContent className={`flex flex-col justify-center items-start w-full px-12 py-6 gap-5`}>

									<Alerts getError={getError} setError={setError} alertMessage={`Please Fill all the Required Fields to Proceed...!`} />

									<div className={`flex justify-center items-start w-full gap-5 max-[950px]:flex-col`}>
										<TextInput handleChange={handleChange} getValue={getTitle} placeholder={'Market Name...!'} id={'name'} name={'name'} label={"Market"} component={'text'} icon={<PersonPinCircleRounded />} />
										<TextInput handleChange={handleChange} getValue={getSelectCategory} placeholder={'Select Category...!'} id={'selectC'} name={'selectC'} label={"Select Category"} component={'select'} icon={<Category />} selectMenu={selectMenuDataCategory} />
									</div>
									<div className={`flex justify-center items-start w-full gap-5 max-[950px]:flex-col`}>
										<TextInput handleChange={handleChange} getValue={getDescription} placeholder={'Market Description...!'} id={'description'} name={'description'} label={"Description"} component={'textArea'} icon={<NotesRounded fontSize='large' />} rows={9} />
										<ImageUpload maxFileSize={1000000} limit={1} fileRef={ fileRef } dropzoneText={"Drag and drop an image here or click to upload Market Logo...!"} showPreviewsInDropzone={true} showPreviews={false} />
									</div>

								</CardContent>

								<CardActions className={`flex justify-between items-center max-[950px]:flex-col gap-5 w-full`}>
									<div className={`flex justify-start items-start max-[950px]:flex-row max-[1200px]:flex-col w-full ml-8 mb-8 gap-5`}>
										<TextInput getValue={getIsActive} handleChange={handleChange} id={'active'} name={'active'} label={`Market  ${ getIsActive ? 'Active...!' : 'Disabled...!'}`} component={'switch'} />
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
