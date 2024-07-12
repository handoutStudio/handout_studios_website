'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { generateSlug } from '@/app/lib/generateSlug';
import { makePostRequest } from '@/app/lib/apiRequest';
import { TextInput } from '@/components/Inputs/TextInput';
import { Buttons } from '@/components/Inputs/SubmitButton';
import { ImageUpload } from '@/components/Inputs/ImageUpload';
import { PageHeader } from '@/components/backoffice/PageHeader';
import { Alert, AlertTitle, Chip, Snackbar } from '@mui/material';
import { AddCircleRounded, AddIcCallRounded, BadgeRounded, Category, CloseRounded, CurrencyRupeeRounded, DateRangeRounded, DescriptionRounded, EditNoteRounded, Groups3, InventoryRounded, MailRounded, PasswordRounded, PersonPinCircleRounded, ProductionQuantityLimitsRounded, PublishRounded, QrCodeScannerRounded, StyleRounded, TagRounded } from '@mui/icons-material';


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
	const [getFullName, setFullName] = React.useState('');
	const [getPassword, setPassword] = React.useState('');
	const [getFirstName, setFirstName] = React.useState('');
	const [getMiddleName, setMiddleName] = React.useState('');

	const [getOpen, setOpen] = React.useState(false);
	const [getError, setError] = React.useState(false);
	const [getActive, setActive] = React.useState(false);
	const [getLoading, setLoading] = React.useState(false);
	const [getApiResponse, setApiResponse] = React.useState({ message: '', color: '' });

	const handleChange = (event: any) => {
		switch (event.target.name) {
			case 'firstName':
				setFirstName(event.target.value);
				setError(false);
				break;
			case 'middleName':
				setMiddleName(event.target.value);
				setError(false);
				break;
			case 'lastName':
				setLastName(event.target.value);
				setError(false);
				break;
			case 'email':
				setEmail(event.target.value);
				setError(false);
				break;
			case 'password':
				setPassword(event.target.value);
				setError(false);
				break;
			case 'phone':
				setPhone(event.target.value);
				setError(false);
				break;
			case 'address':
				setAddress(event.target.value);
				setError(false);
				break;
			case 'note':
				setNote(event.target.value);
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
		setLoading(!getLoading);
		e.preventDefault();
		getFirstName !== '' && getLastName !== '' && getMiddleName !== ''? setFullName(getFirstName + ' ' + getMiddleName + ' ' + getLastName) : setFullName(getFirstName + ' ' + getLastName);

		if(getFirstName !== '' && getLastName !== '') setError(!getError);
		else
		{
			const slug = generateSlug(getFullName);
			
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

			const staffData = { firstName: getFirstName, middleName: getMiddleName, lastName: getLastName, fullName: getFullName, email: getEmail, password: getPassword, phone: getPhone, doj: getDOJ, dob: getDOB, address: getAddress, note: getNote, slug: slug, image: imagePath[0].toString().replaceAll(" ", "-"), isActive: getActive };
			const apiResponse = await makePostRequest('http://localhost:3000/api/staff', staffData, 'Staff');
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

	return (
		<div className={`flex flex-col justify-center items-center w-full gap-8`}>
			<div className={`flex items-center justify-between py-3 px-5 w-full rounded-lg bg-red-300`}>
				<PageHeader pageTitle={'Add New Staff'} link={null} buttonText={null} />
			</div>
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
			<div className={`flex w-5/6 rounded-lg bg-red-50`}>
				<div className={`flex flex-col justify-center items-start w-full px-12 py-6 gap-5`}>

					<div className={`flex justify-center items-start w-full gap-5`}>
						<TextInput handleChange={handleChange} getValue={getFirstName} placeholder={'First Name'} id={'firstName'} name={'firstName'} label={"First Name"} component={'text'} icon={<BadgeRounded />} />
						<TextInput handleChange={handleChange} getValue={getMiddleName} placeholder={'Middle Name'} id={'middleName'} name={'middleName'} label={"Middle Name"} component={'text'} icon={<BadgeRounded />} />
						<TextInput handleChange={handleChange} getValue={getLastName} placeholder={'Last Name'} id={'lastName'} name={'lastName'} label={"Last Name"} component={'text'} icon={<BadgeRounded />} />
					</div>

					<div className={`flex justify-center items-start w-full gap-5`}>
						<TextInput handleChange={handleChange} getValue={getEmail} placeholder={'xyz@admin.com'} id={'email'} name={'email'} type={'email'} label={"Email"} component={'text'} icon={<MailRounded />} />
						<TextInput handleChange={handleChange} getValue={getPassword} placeholder={'Password'} id={'password'} name={'password'} label={"Password"} type={'password'} component={'text'} icon={<PasswordRounded />} />
						<TextInput handleChange={handleChange} getValue={getPhone} placeholder={'Phone Number'} id={'phone'} name={'phone'} label={"Phone Number"} component={'text'} icon={<AddIcCallRounded />} />
					</div>

					<div className={`flex justify-center items-start w-full gap-5`}>
						<TextInput handleChange={handleDOJAccept} placeholder={'DD/MM/YYYY'} minDate={false} getValue={getDOJ} id={'doj'} name={'doj'} label={"Date Of Joining"} component={'date'} icon={<DateRangeRounded />} />					
						<TextInput handleChange={handleDOBAccept} placeholder={'DD/MM/YYYY'} minDate={false} getValue={getDOB} id={'dob'} name={'dob'} label={"Date Of Birth"} component={'date'} icon={<DateRangeRounded />} />					
					</div>

					<div className={`flex justify-center items-start w-full gap-5`}>
						<TextInput getValue={getAddress} handleChange={handleChange} placeholder={'Address'} id={'address'} name={'address'} label={"Physical Address"} component={'textArea'} icon={<PersonPinCircleRounded fontSize='large' />} />
						<TextInput getValue={getNote} handleChange={handleChange} placeholder={'Note'} id={'note'} name={'note'} label={"Notes"} component={'textArea'} icon={<DescriptionRounded fontSize='large' />} />
						<ImageUpload maxFileSize={1048576} limit={1} fileRef={ fileRef } dropzoneText={"Drag and drop an image here or click to upload Your Photo...!"} showPreviewsInDropzone={true} showPreviews={false} />
					</div>
					
					<div className={`flex justify-start items-center gap-2`}>
						<TextInput getValue={getActive} handleChange={handleChange} id={'active'} name={'active'} label={"Is Staff Member Working...?"} component={'switch'} />
						<Chip color={ getActive ? 'error' : 'default' } label={ getActive ? 'Working' : 'Left' } onDelete={() => { setActive(!getActive) }} deleteIcon={ getActive ? <PublishRounded fontSize='small' /> : <EditNoteRounded fontSize='small' /> } />
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
