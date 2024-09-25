'use client';

import * as React from 'react';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';
import { generateSlug } from '@/app/lib/generateSlug';
import { makePostRequest } from '@/app/lib/apiRequest';
import { Loading } from '@/components/Loading/Loading';
import { TextInput } from '@/components/Inputs/TextInput';
import { Buttons } from '@/components/Inputs/SubmitButton';
import { ImageUpload } from '@/components/Inputs/ImageUpload';
import { Alerts } from '@/components/Inputs/AlertsAndSnackBars/Alerts';
import { Snackbars } from '@/components/Inputs/AlertsAndSnackBars/Snackbars';
import { generateISOFormattedDate } from '@/app/lib/generateISOFormattedDate';
import { Card, CardActions, CardContent, CardHeader, Chip, Tooltip } from '@mui/material';
import { AddCircleRounded, CloseRounded, DateRangeRounded, LocalOfferRounded, LoyaltyRounded } from '@mui/icons-material';


export default function NewCoupons() {
	
	const router = useRouter();
	const fileRef = React.useRef();
	const [getCode, setCode] = React.useState('');
	const [getDate, setDate] = React.useState('');
	const [getTitle, setTitle] = React.useState('');
	const [getOpen, setOpen] = React.useState(false);
	const [getError, setError] = React.useState(false);
	const [getIsActive, setIsActive] = React.useState(true);
	const [getIsLoading, setIsLoading] = React.useState(true);
	const [getApiResponse, setApiResponse] = React.useState({ message: '', color: '' });

	React.useEffect(() => {
		setCode(nanoid(getTitle.length + getDate.length).toUpperCase())
	}, [getTitle, getDate]);

	const handleChange = (event: any) => {

		if(Object.keys(event).includes('target'))
		{

			const { name, value, checked } = event.target;
			switch(name) {
				case 'title': setTitle(value); break;
				case 'code': setCode(value); break;
				case 'active': setIsActive(checked); break;
				default: break;
			}
		}
		else
		{
			const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
			let month: any = months.indexOf(event[Object.keys(event)[2]].toString().split(' ')[1]) + 1;
			month = month < 10 ? '0' + month : month;
			const date = event[Object.keys(event)[5]];
			const year = event[Object.keys(event)[3]];
			const fulldate = month + '/' + date +  '/' + year;
			setDate(fulldate);
		}		
		setError(false)

	};
	
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		if(getTitle === '' || getCode === '') setError(true);
		else
		{
			setIsLoading(true);
			const slug = generateSlug(getTitle);
			const response = await uploadImage(fileRef.current?.[0])
				.then((response: any) => response.json())
				.then((data: any) => { return data.message })
				.catch((error: any) => console.log(error));

			const imagePath = response.substring(response.indexOf('/public'), response.length);
			const isoFormattedDate = generateISOFormattedDate(getDate);
			const couponData = { title: getTitle, couponCode: getCode, slug: slug, image: imagePath, expiryDate: isoFormattedDate, isActive: getIsActive };
			const apiResponse = await makePostRequest('http://localhost:3000/api/coupons', couponData, 'Coupoun');
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


	const cleanUp = () => {
		setCode('');
		setDate('');
		setTitle('');
		setIsActive(true);
	}

	return (
		<div className={`w-full flex justify-center items-center min-[950px]:p-5 p-2`}>
			{/* 
				- id => auto()
				- title => userInput()
				- code => auto()
				- expiryDate => Date()
				- image => userInput()
			*/}
			{
				getIsLoading
				?
					(<Loading setIsLoading={setIsLoading} />)
				:
					(
						<>
							<Card className={`flex min-[500px]:w-3/4 w-full flex-col rounded-lg bg-red-50 min-[569px]:gap-5 gap-2`}>
								<CardHeader className={`flex justify-center items-center py-3 px-5 w-full rounded-tl-lg rounded-tr-lg bg-red-300 max-[600px]:flex-col`} title="Add New Coupon" />
								<CardContent className={`flex flex-col justify-center items-start w-full px-12 py-6 gap-5`}>

									<Alerts getError={getError} setError={setError} alertMessage={`Please Fill all the Required Fields to Proceed...!`} />

									<div className={`flex w-full gap-5 justify-around items-center max-[950px]:flex-col`}>
										<div className={`flex gap-10 justify-around items-center flex-col`}>
											<TextInput handleChange={handleChange} getValue={getTitle} placeholder={'Coupons Title...!'} id={'title'} name={'title'} label={"Coupon"} component={'text'} icon={<LocalOfferRounded />} />
											<ImageUpload maxFileSize={1048576} limit={1} fileRef={ fileRef } dropzoneText={"Drag and drop an image here or click to upload Coupon background...!"} showPreviewsInDropzone={true} showPreviews={false} />
										</div>
										<TextInput handleChange={(event: any) => handleChange(event)} placeholder={'Expiry Date'} minDate={true} getValue={getDate} id={'date'} name={'date'} label={"Expiry Date"} component={'date'} icon={<DateRangeRounded />} />
									</div>
								</CardContent>
								<CardActions className={`flex justify-between items-center max-[950px]:flex-col gap-5 w-full`}>
									<div className={`flex justify-start items-start flex-col w-full ml-8 min-[569px]:mb-8 mb-4 gap-5 max-[950px]:flex-col`}>
										<div className={`flex w-full justify-start items-center gap-2 max-[950px]:flex-col`}>
											<TextInput getValue={getIsActive} handleChange={handleChange} id={'active'} name={'active'} label={"Coupon Active...?"} component={'switch'} />
											<div className={`w-[50%] max-[569px]:w-full text-ellipsis`}>
												<Tooltip title={"Code: " + getCode} className={ getCode ? '' : 'invisible hidden' }>
													<Chip className={`text-ellipsis w-[90%]`} color={ getIsActive ? 'error' : 'warning' } icon={<LoyaltyRounded fontSize='small' />} label={ getCode } />
												</Tooltip>
											</div>
										</div>
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
