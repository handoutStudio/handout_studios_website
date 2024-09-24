'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { generateSlug } from '@/app/lib/generateSlug';
import { makePostRequest } from '@/app/lib/apiRequest';
import { TextInput } from '@/components/Inputs/TextInput';
import { Buttons } from '@/components/Inputs/SubmitButton';
import { Alerts } from '@/components/Inputs/AlertsAndSnackBars/Alerts';
import { Card, CardActions, CardContent, CardHeader } from '@mui/material';
import { Snackbars } from '@/components/Inputs/AlertsAndSnackBars/Snackbars';
import { AddCircleRounded, CallRounded, CloseRounded, EmailRounded, ListAltRounded, NotesRounded, Person2Rounded, PersonPinCircleRounded, PinDropRounded } from '@mui/icons-material';


export default function NewSeller() {
	
	const router = useRouter();
	const [getOpen, setOpen] = React.useState(false);
	const [getTitle, setTitle] = React.useState('');
	const [getNotes, setNotes] = React.useState('');
	const [getPhone, setPhone] = React.useState('');
	const [getEmail, setEmail] = React.useState('');
	const [getError, setError] = React.useState(false);
	const [getAddress, setAddress] = React.useState('');
	const [getLoading, setLoading] = React.useState(false);
	const [getIsActive, setIsActive] = React.useState(true);
	const [getPaymentTerms, setPaymentTerms] = React.useState('');
	const [getContactPerson, setContactPerson] = React.useState('');
	const [getApiResponse, setApiResponse] = React.useState({ message: '', color: '' });

	const handleChange = (event: any) => {
		const { value, name, checked } = event.target;

		switch (name) {
			case 'name': setTitle(value); break;
			case 'phone': setPhone(value); break;
			case 'email': setEmail(value); break;
			case 'address': setAddress(value); break;
			case 'contact': setContactPerson(value); break;
			case 'payment': setPaymentTerms(value); break;
			case 'notes': setNotes(value); break;
			case 'active': setIsActive(checked); break;
		
			default:
				break;
		}
		setError(false);

	};
	
	const handleSubmit = async (e: any) => {
		setLoading(!getLoading);
		e.preventDefault();
		if(getTitle === '') setError(!getError); 
		else
		{
			const slug = generateSlug(getTitle);
			const sellerData = { title: getTitle, slug: slug, phone: getPhone, email: getEmail, contactPerson: getContactPerson, address: getAddress, payment: getPaymentTerms, notes: getNotes, isActive: getIsActive };
			const apiResponse = await makePostRequest('http://localhost:3000/api/sellers', sellerData, 'Seller');
			setApiResponse(apiResponse!);
			setOpen(!getOpen);

			setTimeout(() => {
				setOpen(!getOpen);
				router.back();
			}, 2000);
		}
		setLoading(!getLoading);
	}

	return (
		<div className={`w-full flex justify-center items-center min-[950px]:p-5 p-2`}>
			{/* 
				- id => auto()
				- title => userInput()
				- slug => auto()
				- phone => userInput()
				- email => userInput()
				- contactPerson => userInput()
				- address => userInput()
				- payment => userInput()
				- notes => userInput()
				- isActive => userInput()
			*/}
			<Card className={`flex min-[950px]:w-3/4 w-full flex-col rounded-lg bg-red-50 gap-5`}>
				
				<CardHeader className={`flex justify-center items-center py-3 px-5 w-full rounded-tl-lg rounded-tr-lg bg-red-300 max-[600px]:flex-col`} title="Add New Seller" />
				
				<CardContent className={`flex flex-col justify-center items-start w-full px-12 py-6 gap-5`}>

					<Alerts getError={getError} setError={setError} alertMessage={`Please Fill all the Required Fields to Proceed...!`} />

					<div className={`flex justify-center items-start w-full gap-5 max-[950px]:flex-col`}>
						<TextInput handleChange={handleChange} getValue={getTitle} placeholder={'Seller Name...!'} id={'name'} name={'name'} label={"Seller"} component={'text'} icon={<PersonPinCircleRounded />} />
						<TextInput handleChange={handleChange} getValue={getPhone} placeholder={'Seller Phone...!'} id={'phone'} name={'phone'} label={"Phone"} component={'text'} icon={<CallRounded />} type={'tel'} />
					</div>

					<div className={`flex justify-center items-start w-full gap-5 max-[950px]:flex-col`}>
						<TextInput handleChange={handleChange} getValue={getEmail} placeholder={'Seller Email...!'} id={'email'} name={'email'} label={"Email"} component={'text'} icon={<EmailRounded />} type={'email'} />
						<TextInput handleChange={handleChange} getValue={getContactPerson} placeholder={'Seller Contact Person...!'} id={'contact'} name={'contact'} label={"Contact Person"} component={'text'} icon={<Person2Rounded />} />
					</div>

					<div className={`flex justify-center items-start w-full gap-5 max-[950px]:flex-col`}>
						<TextInput getValue={getAddress} handleChange={handleChange} placeholder={'Seller Address...!'} id={'address'} name={'address'} label={"Address"} component={'textArea'} icon={<PinDropRounded fontSize='large' />} rows={5} />
						<TextInput handleChange={handleChange} getValue={getNotes} placeholder={'Seller Notes...!'} id={'notes'} name={'notes'} label={"Notes"} component={'textArea'} icon={<NotesRounded fontSize='large' />} rows={5} />
					</div>

					<TextInput getValue={getPaymentTerms} handleChange={handleChange} placeholder={'Seller Payment Terms...!'} id={'payment'} name={'payment'} label={"Payment Terms"} component={'textArea'} icon={<ListAltRounded fontSize='large' />} rows={10} />

				</CardContent>

				<CardActions className={`flex justify-between items-center max-[950px]:flex-col gap-5 w-full`}>
					<div className={`flex justify-start items-start max-[950px]:flex-row max-[1200px]:flex-col w-full ml-8 mb-8 gap-5`}>
						<TextInput getValue={getIsActive} handleChange={handleChange} id={'active'} name={'active'} label={`Seller  ${ getIsActive ? 'Active...!' : 'Disabled...!'}`} component={'switch'} />
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
