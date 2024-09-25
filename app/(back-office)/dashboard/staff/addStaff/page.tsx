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
import { Snackbars } from '@/components/Inputs/AlertsAndSnackBars/Snackbars';
import { Card, CardActions, CardContent, CardHeader, Chip } from '@mui/material';
import { AddCircleRounded, AddIcCallRounded, AssignmentLateRounded, BadgeRounded, CloseRounded, DateRangeRounded, DescriptionRounded, MailRounded, PasswordRounded, PersonPinCircleRounded } from '@mui/icons-material';


export default function NewProducts() {
	
	const router = useRouter();
	const fileRef = React.useRef();
	const [getDOJ, setDOJ] = React.useState('');
	const [getDOB, setDOB] = React.useState('');
	const [getNote, setNote] = React.useState('');
	const [getEmail, setEmail] = React.useState('');
	const [getPhone, setPhone] = React.useState('');
	const [getAddress, setAddress] = React.useState('');
	const [getLastName, setLastName] = React.useState('');
	const [getPassword, setPassword] = React.useState('');
	const [getFirstName, setFirstName] = React.useState('');
	const [getMiddleName, setMiddleName] = React.useState('');

	const [getOpen, setOpen] = React.useState(false);
	const [getError, setError] = React.useState(false);
	const [getActive, setActive] = React.useState(false);
	const [getIsLoading, setIsLoading] = React.useState(true);
	const [getApiResponse, setApiResponse] = React.useState({ message: '', color: '' });

	const handleChange = (event: any) => {

		const { value, checked } = event.target;

		switch (event.target.name) {
			case 'firstName': setFirstName(value); break;
			case 'middleName': setMiddleName(value); break;
			case 'lastName': setLastName(value); break;
			case 'email': setEmail(value); break;
			case 'password': setPassword(value); break;
			case 'phone': setPhone(value); break;
			case 'address': setAddress(value); break;
			case 'note': setNote(value); break;
			case 'active': setActive(checked); break;
			default: break;
		}
		setError(false);
	};

	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	const handleDOJAccept = (event: any) => {
		let month: any = months.indexOf(event[Object.keys(event)[2]].toString().split(' ')[1]) + 1;
		month = month < 10 ? '0' + month : month;
		const date = event[Object.keys(event)[5]];
		const year = event[Object.keys(event)[3]];
		const fulldate = month + '/' + date +  '/' + year;
		setDOJ(fulldate);
		setError(false);
	}
	const handleDOBAccept = (event: any) => {
		let month: any = months.indexOf(event[Object.keys(event)[2]].toString().split(' ')[1]) + 1;
		month = month < 10 ? '0' + month : month;
		const date = event[Object.keys(event)[5]];
		const year = event[Object.keys(event)[3]];
		const fulldate = month + '/' + date +  '/' + year;
		setDOB(fulldate);
		setError(false);
	}
	
	const handleSubmit = async (e: any) => {
		e.preventDefault();

		const getFullName = generateFullName(getFirstName, getMiddleName, getLastName);

		if(getFirstName === '' && getLastName === '') setError(!getError);
		else
		{
			setIsLoading(true);
			const slug = generateSlug(getFullName);
			
			const fileArrays: any = fileRef.current;
			let response:any = '';
			for(let i = 0; i < fileArrays.length; i++)
			{
				response += (await uploadImage(fileRef.current?.[i], i, getFullName)
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

			const staffData = { firstName: getFirstName, middleName: getMiddleName, lastName: getLastName, fullName: getFullName, email: getEmail, password: getPassword, phone: getPhone, doj: getDOJ, dob: getDOB, address: getAddress, note: getNote, slug: slug, image: imagePath[0].toString().replaceAll(" ", "-"), isActive: getActive };
			console.log(staffData);
			const apiResponse = await makePostRequest('http://localhost:3000/api/staff', staffData, 'Staff');
			cleanUp();
			setApiResponse(apiResponse!);
			console.log(apiResponse)
			setOpen(true);

			setTimeout(() => {
				router.back();
			}, 2000);
		}
		
	}

	const uploadImage = async (fileRef: any, index: number, getFullName: string) =>
	{
		try
		{
			const data = new FormData();
			data.set('file', fileRef);
			data.set('folder', 'Staff/');
			data.set('name', getFullName + index);

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
		setDOJ('');
		setDOB('');
		setNote('');
		setEmail('');
		setPhone('');
		setAddress('');
		setLastName('');
		setPassword('');
		setFirstName('');
		setMiddleName('');
		setActive(false);
	}

	const generateFullName = (getFirstName: string, getMiddleName: string, getLastName : string) => {
		let fullName = '';
		getFirstName !== '' && getLastName !== '' && getMiddleName !== ''
		?
			fullName = getFirstName + ' ' + getMiddleName + ' ' + getLastName
		:
			getFirstName !== '' && getLastName !== '' && getMiddleName === ''
			?
				fullName = getFirstName + ' ' + getLastName
			:
				fullName = getFirstName + ' ' + getLastName
		
		return fullName;
	}

	return (
		<div className={`w-full flex justify-center items-center min-[950px]:p-5 p-2`}>
			{/* 
				- id => auto()
				- firstName => userInput()
				- middleName => userInput()
				- lastName => userInput()
				- fullName => auto()
				- email => userInput()
				- password => userInput()
				- phone => userInput()
				- address => userInput()
				- note => userInput()
				- slug => auto()
				- images => userInput()
			*/}
			{
				getIsLoading
				?
					(<Loading setIsLoading={setIsLoading} />)
				:
				
				(
					<>
						<Card className={`flex min-[950px]:w-3/4 w-full flex-col rounded-lg bg-red-50 gap-5`}>
							
							<CardHeader className={`flex justify-center items-center py-3 px-5 w-full rounded-tl-lg rounded-tr-lg bg-red-300 max-[600px]:flex-col`} title="Add New Product" />
							
							<CardContent className={`flex flex-col justify-center items-start w-full px-12 py-6 gap-5`}>

								<Alerts getError={getError} setError={setError} alertMessage={`Please Fill all the Required Fields to Proceed...!`} />

								<div className={`flex justify-center items-start w-full gap-5 max-[1000px]:flex-col`}>
									<TextInput handleChange={handleChange} getValue={getFirstName} placeholder={'First Name'} id={'firstName'} name={'firstName'} label={"First Name"} component={'text'} icon={<BadgeRounded />} />
									<TextInput handleChange={handleChange} getValue={getMiddleName} placeholder={'Middle Name'} id={'middleName'} name={'middleName'} label={"Middle Name"} component={'text'} icon={<BadgeRounded />} />
									<TextInput handleChange={handleChange} getValue={getLastName} placeholder={'Last Name'} id={'lastName'} name={'lastName'} label={"Last Name"} component={'text'} icon={<BadgeRounded />} />
								</div>

								<div className={`flex justify-center items-start w-full gap-5 max-[1000px]:flex-col`}>
									<TextInput handleChange={handleChange} getValue={getEmail} placeholder={'xyz@admin.com'} id={'email'} name={'email'} type={'email'} label={"Email"} component={'text'} icon={<MailRounded />} />
									<TextInput handleChange={handleChange} getValue={getPassword} placeholder={'Password'} id={'password'} name={'password'} label={"Password"} type={'password'} component={'text'} icon={<PasswordRounded />} />
									<TextInput handleChange={handleChange} getValue={getPhone} placeholder={'Phone Number'} id={'phone'} name={'phone'} label={"Phone Number"} component={'text'} icon={<AddIcCallRounded />} />
								</div>

								<div className={`flex justify-center items-start w-full gap-5 max-[1000px]:flex-col`}>
									<TextInput handleChange={handleDOJAccept} placeholder={'DD/MM/YYYY'} minDate={false} getValue={getDOJ} id={'doj'} name={'doj'} label={"Date Of Joining"} component={'date'} icon={<DateRangeRounded />} />					
									<TextInput handleChange={handleDOBAccept} placeholder={'DD/MM/YYYY'} minDate={false} getValue={getDOB} id={'dob'} name={'dob'} label={"Date Of Birth"} component={'date'} icon={<DateRangeRounded />} />					
								</div>

								<div className={`flex justify-center items-start w-full gap-5 max-[1000px]:flex-col`}>
									<TextInput getValue={getAddress} handleChange={handleChange} placeholder={'Address'} id={'address'} name={'address'} label={"Physical Address"} component={'textArea'} icon={<PersonPinCircleRounded fontSize='large' />} />
									<TextInput getValue={getNote} handleChange={handleChange} placeholder={'Note'} id={'note'} name={'note'} label={"Notes"} component={'textArea'} icon={<DescriptionRounded fontSize='large' />} />
									<ImageUpload maxFileSize={1048576} limit={1} fileRef={ fileRef } dropzoneText={"Drag and drop an image here or click to upload Your Photo...!"} showPreviewsInDropzone={true} showPreviews={false} />
								</div>
							</CardContent>

							<CardActions className={`flex justify-between items-center max-[950px]:flex-col gap-5 w-full`}>
								<div className={`flex justify-start items-start flex-row max-[1200px]:flex-col w-full ml-8 mb-8 gap-5`}>
									<TextInput getValue={getActive} handleChange={handleChange} id={'active'} name={'active'} label={"Publish Your Training...?"} component={'switch'} />
									<Chip color={ getActive ? 'success' : 'error' } label={ getActive ? 'Working' : 'Left' } onDelete={() => { setActive(!getActive) }} deleteIcon={ getActive ? <BadgeRounded fontSize='small' /> : <AssignmentLateRounded fontSize='small' /> } />
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
