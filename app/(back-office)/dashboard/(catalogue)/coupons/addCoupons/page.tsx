'use client';

import * as React from 'react';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';
import { generateSlug } from '@/app/lib/generateSlug';
import { makePostRequest } from '@/app/lib/apiRequest';
import { TextInput } from '@/components/Inputs/TextInput';
import { Buttons } from '@/components/Inputs/SubmitButton';
import { Alert, AlertTitle, Snackbar } from '@mui/material';
import { ImageUpload } from '@/components/Inputs/ImageUpload';
import { PageHeader } from '@/components/backoffice/PageHeader';
import { AddCircleRounded, CloseRounded, DateRangeRounded, LocalOfferRounded, LoyaltyRounded } from '@mui/icons-material';


export default function NewCoupons() {
	
	const router = useRouter();
	const fileRef = React.useRef();
	const [getCode, setCode] = React.useState('');
	const [getDate, setDate] = React.useState('');
	const [getTitle, setTitle] = React.useState('');
	const [getOpen, setOpen] = React.useState(false);
	const [getError, setError] = React.useState(false);
	const [getLoading, setLoading] = React.useState(false);
	const [getApiResponse, setApiResponse] = React.useState({ message: '', color: '' });

	React.useEffect(() => {
		setCode(nanoid(getTitle.length + getDate.length).toUpperCase())
	}, [getTitle, getDate]);

	const handleChange = (event: any) => {

		if(Object.keys(event).includes('target'))
		{
			event.target.id === 'title' ? setTitle(event.target.value) : event.target.id === 'code' ? setCode(event.target.value) : null;
		}
		else
		{
			const date = event[Object.keys(event)[5]]
			const month = Number(event[Object.keys(event)[4]]) < Number(10) ? '0' + event[Object.keys(event)[4]] : event[Object.keys(event)[4]]
			const year = event[Object.keys(event)[3]];
			const fulldate = month + '/' + date +  '/' + year;
			setDate(fulldate);
		}		
		setError(false)

	};
	
	const handleSubmit = async (e: any) => {
		setLoading(!getLoading);
		e.preventDefault();
		if(getTitle === '' || getCode === '') setError(!getError); 
		else
		{
			const slug = generateSlug(getTitle);
			const response = await uploadImage(fileRef.current?.[0])
				.then((response: any) => response.json())
				.then((data: any) => { return data.message })
				.catch((error: any) => console.log(error));

			const imagePath = response.substring(response.indexOf('/public'), response.length);
			const couponData = { title: getTitle, couponCode: getCode, slug: slug, image: imagePath, expiryDate: getDate };
			const apiResponse = await makePostRequest('http://localhost:3000/api/coupons', couponData, 'Coupoun');
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
			data.set('folder', 'Coupons/');
			data.set('name', generateSlug(getTitle));

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
			<div className={`flex items-center justify-between py-3 px-5 w-full rounded-lg bg-red-300`}>
				<PageHeader pageTitle={'Add New Coupon'} link={null} buttonText={null} />
			</div>
			{/* 
				- id => auto()
				- title => userInput()
				- code => auto()
				- expiryDate => Date()
				- image => userInput()
			*/}
			<div className={`flex w-5/6 rounded-lg bg-red-50`}>
				<div className={`flex flex-col justify-center items-start w-full px-12 py-6 gap-5`}>
					<div className={`flex w-full gap-10 justify-evenly items-center`}>
						<div className={`flex flex-col w-full gap-10 justify-around`}>
							<TextInput handleChange={handleChange} getValue={getTitle} placeholder={'Coupons Title...!'} id={'title'} name={'title'} label={"Coupon"} component={'text'} icon={<LocalOfferRounded />} />
							<TextInput disabled={true} handleChange={handleChange} getValue={getCode} placeholder={'Coupons Code...!'} id={'code'} name={'code'} label={"Coupon Code"} component={'text'} icon={<LoyaltyRounded />} />
							<ImageUpload maxFileSize={1048576} limit={1} fileRef={ fileRef } dropzoneText={"Drag and drop an image here or click to upload Coupon background...!"} showPreviewsInDropzone={true} showPreviews={false} />
						</div>
						<div className={`flex w-full gap-20 justify-around items-center`}>
							<TextInput handleChange={handleChange} placeholder={'Expiry Date'} getValue={getDate} id={'date'} name={'date'} label={"Expiry Date"} component={'date'} icon={<DateRangeRounded />} />					
						</div>
					</div>
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
