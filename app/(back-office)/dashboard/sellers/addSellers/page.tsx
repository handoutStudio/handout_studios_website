'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { generateSlug } from '@/app/lib/generateSlug';
import { makePostRequest } from '@/app/lib/apiRequest';
import { TextInput } from '@/components/Inputs/TextInput';
import { Buttons } from '@/components/Inputs/SubmitButton';
import { Alert, AlertTitle, Snackbar } from '@mui/material';
import { PageHeader } from '@/components/backoffice/PageHeader';
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
	const [getPaymentTerms, setPaymentTerms] = React.useState('');
	const [getContactPerson, setContactPerson] = React.useState('');
	const [getApiResponse, setApiResponse] = React.useState({ message: '', color: '' });

	const handleChange = (event: any) => {
		if(event.target.name === 'name') { setTitle(event.target.value); setError(false); }
		else if(event.target.name === 'phone') { setPhone(event.target.value); setError(false); }
		else if(event.target.name === 'email') { setEmail(event.target.value); setError(false); }
		else if(event.target.name === 'address') { setAddress(event.target.value); setError(false); }
		else if(event.target.name === 'contact') { setContactPerson(event.target.value); setError(false); }
		else if(event.target.name === 'payment') { setPaymentTerms(event.target.value); setError(false); }
		else { setNotes(event.target.value); setError(false); }

	};
	
	const handleSubmit = async (e: any) => {
		setLoading(!getLoading);
		e.preventDefault();
		if(getTitle === '') setError(!getError); 
		else
		{
			const slug = generateSlug(getTitle);
			const sellerData = { title: getTitle, slug: slug, phone: getPhone, email: getEmail, contactPerson: getContactPerson, address: getAddress, payment: getPaymentTerms, notes: getNotes };
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
		<div className={`flex flex-col justify-center items-center w-full gap-8`}>
			{/* 
				- id => auto()
				- title => userInput()
				- slug => auto()
				- link => auto()
				- image => userInput()
			*/}
			<div className={`flex flex-col w-[90%] rounded-lg bg-red-50 gap-5`}>
				<PageHeader pageTitle={'Add New Seller'} link={null} buttonText={null} />
				<div className={`flex flex-col justify-center items-start w-full px-12 py-6 gap-5`}>
					
					<div className={`flex justify-center items-start w-full gap-5 max-[680px]:flex-col`}>
						<TextInput handleChange={handleChange} getValue={getTitle} placeholder={'Seller Name...!'} id={'name'} name={'name'} label={"Seller"} component={'text'} icon={<PersonPinCircleRounded />} />
						<TextInput handleChange={handleChange} getValue={getPhone} placeholder={'Seller Phone...!'} id={'phone'} name={'phone'} label={"Phone"} component={'text'} icon={<CallRounded />} type={'tel'} />
					</div>

					<div className={`flex justify-center items-start w-full gap-5 max-[680px]:flex-col`}>
						<TextInput handleChange={handleChange} getValue={getEmail} placeholder={'Seller Email...!'} id={'email'} name={'email'} label={"Email"} component={'text'} icon={<EmailRounded />} type={'email'} />
						<TextInput handleChange={handleChange} getValue={getContactPerson} placeholder={'Seller Contact Person...!'} id={'contact'} name={'contact'} label={"Contact Person"} component={'text'} icon={<Person2Rounded />} />
					</div>

					<div className={`flex justify-center items-start w-full gap-5 max-[680px]:flex-col`}>
						<TextInput getValue={getAddress} handleChange={handleChange} placeholder={'Seller Address...!'} id={'address'} name={'address'} label={"Address"} component={'textArea'} icon={<PinDropRounded fontSize='large' />} rows={5} />
						<TextInput handleChange={handleChange} getValue={getNotes} placeholder={'Seller Notes...!'} id={'notes'} name={'notes'} label={"Notes"} component={'textArea'} icon={<NotesRounded fontSize='large' />} rows={5} />
					</div>

						<TextInput getValue={getPaymentTerms} handleChange={handleChange} placeholder={'Seller Payment Terms...!'} id={'payment'} name={'payment'} label={"Payment Terms"} component={'textArea'} icon={<ListAltRounded fontSize='large' />} rows={10} />

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
