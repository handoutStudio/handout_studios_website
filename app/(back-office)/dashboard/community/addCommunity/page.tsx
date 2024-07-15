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
import { AddCircleRounded, Category, CloseRounded, CurrencyRupeeRounded, DescriptionRounded, EditNoteRounded, Groups3, InventoryRounded, ProductionQuantityLimitsRounded, PublishRounded, QrCodeScannerRounded, StyleRounded, TagRounded } from '@mui/icons-material';


export default function NewProducts() {
	
	const router = useRouter();
	const fileRef = React.useRef();
	const [getSKU, setSKU] = React.useState(1);
	const [getTitle, setTitle] = React.useState('');
	const [getTags, setTags]: any = React.useState(['']);
	const [getOpen, setOpen] = React.useState(false);
	const [getBarcode, setBarcode] = React.useState();
	const [getError, setError] = React.useState(false);
	const [getActive, setActive] = React.useState(false);
	const [getQuantity, setQuantity] = React.useState(10);
	const [getLoading, setLoading] = React.useState(false);
	const [getSalePrice, setSalePrice] = React.useState(2.99);
	const [getDescription, setDescription] = React.useState('');
	const [getSelectSeller, setSelectSeller] = React.useState([]);
	const [getProductPrice, setProductPrice] = React.useState(1.99);
	const [getSelectCategory, setSelectCategory] = React.useState([]);
	const [getApiResponse, setApiResponse] = React.useState({ message: '', color: '' });
	const tags: any = [];

	const handleChange = (event: any) => {

		switch (event.target.name) {
			case 'title':
				setTitle(event.target.value);
				setError(false);
				break;
			case 'description':
				setDescription(event.target.value);
				setError(false);
				break;
			case 'selectC':
				setSelectCategory(event.target.value);
				setError(false);
				break;
			case 'selectS':
				setSelectSeller(event.target.value);
				setError(false);
				break;
			case 'unit':
				setSKU(event.target.value);
				setError(false);
				break;
			case 'quantity':
				setQuantity(event.target.value);
				setError(false);
				break;
			case 'barcode':
				setBarcode(event.target.value);
				setError(false);
				break;
			case 'productPrice':
				setProductPrice(event.target.value);
				setError(false);
				break;
			case 'productSalePrice':
				setSalePrice(event.target.value);
				setError(false);
				break;
			case 'tags':
				tags.push(event.target.value.split(","));
				setTags(tags[0]);
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
	
	const handleSubmit = async (e: any) => {
		setLoading(!getLoading);
		e.preventDefault();
		if(getTitle === '' || getDescription === '') setError(!getError); 
		else
		{
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

			const communityData = { title: getTitle, selectCategory: getSelectCategory, selectSeller: getSelectSeller, sku: getSKU, quantity: getQuantity, barcode: getBarcode, productPrice: getProductPrice, salePrice: getSalePrice, slug: slug, tags: getTags, description: getDescription, image: imagePath, isActive: getActive };
			const apiResponse = await makePostRequest('http://localhost:3000/api/community', communityData, 'Community');
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
	const selectMenuDataSeller = ['One', 'Two', 'Three'];


	return (
		<div className={`flex flex-col justify-center items-center w-full gap-8`}>
			<div className={`flex items-center justify-between py-3 px-5 w-full rounded-lg bg-red-300`}>
				<PageHeader pageTitle={'Add New Community'} link={null} buttonText={null} />
			</div>
			{/* 
				- id => auto()
				- title => userInput()
				- category => userInput()
				- seller => userInput()
				- Stock Keeping Unit (SKU) => userInput()
				- Quantity => userInput()
				- barcode => userInput()
				- productPrice => userInput()
				- salePrice => userInput()
				- slug => auto()
				- tags => userInput[Array]
				- description => userInput()
				- images => userInput() max 5
			*/}
			<div className={`flex w-5/6 rounded-lg bg-red-50`}>
				<div className={`flex flex-col justify-center items-start w-full px-12 py-6 gap-5`}>

					<div className={`flex justify-center items-start w-full gap-5`}>
						<TextInput handleChange={handleChange} getValue={getTitle} placeholder={'Product Title...!'} id={'title'} name={'title'} label={"Product"} component={'text'} icon={<StyleRounded />} />
						<TextInput handleChange={handleChange} getValue={getSelectCategory} placeholder={'Select Category...!'} id={'selectC'} name={'selectC'} label={"Select Category"} component={'select'} icon={<Category />} selectMenu={selectMenuDataCategory} />
						<TextInput handleChange={handleChange} getValue={getSelectSeller} placeholder={'Select Seller...!'} id={'selectS'} name={'selectS'} label={"Select Seller"} component={'select'} icon={<Groups3 />} selectMenu={selectMenuDataSeller} />
					</div>

					<div className={`flex justify-center items-start w-full gap-5`}>
						<TextInput handleChange={handleChange} getValue={getSKU} placeholder={'Stock Keeping Unit...!'} id={'unit'} name={'unit'} label={"Stock Keeping Unit"} component={'number'} type={'number'} icon={<InventoryRounded />} />
						<TextInput handleChange={handleChange} getValue={getQuantity} placeholder={'Stock Quantity...!'} id={'quantity'} name={'quantity'} label={"Quantity"} component={'number'} type={'number'} icon={<ProductionQuantityLimitsRounded />} />
						<TextInput handleChange={handleChange} getValue={getBarcode} placeholder={'Barcode...!'} id={'barcode'} name={'barcode'} label={"Barcode"} component={'text'} icon={<QrCodeScannerRounded />} />
					</div>

					<div className={`flex justify-center items-start w-full gap-5`}>
						<TextInput handleChange={handleChange} getValue={getProductPrice} placeholder={'Product Price...!'} id={'productPrice'} name={'productPrice'} label={"Product Price"} component={'currency'} type={'number'} icon={<CurrencyRupeeRounded />} />
						<TextInput handleChange={handleChange} getValue={getSalePrice} placeholder={'Product Sale Price...!'} id={'productSalePrice'} name={'productSalePrice'} label={"Product Sale Price"} component={'currency'} type={'number'} icon={<CurrencyRupeeRounded />} />
					</div>

					<ImageUpload maxFileSize={1048576} limit={5} fileRef={ fileRef } dropzoneText={"Drag and drop an image here or click to upload Product Image...!"} showPreviewsInDropzone={false} showPreviews={true} />

					<div className={`flex justify-start align-middle items-center gap-5`}> { getTags.map((tag: any, index: number) => <Chip key={index} color='error' label={`#${tag}`} /> )} </div>
					
					<TextInput getValue={getTags} handleChange={handleChange} placeholder={'Tags (should be comma "," seperated)...!'} id={'tags'} name={'tags'} label={"Tags"} component={'text'} icon={<TagRounded />} />
					<TextInput getValue={getDescription} handleChange={handleChange} placeholder={'Product Description...!'} id={'description'} name={'description'} label={"Description"} component={'textArea'} icon={<DescriptionRounded fontSize='large' />} />
					
					<div className={`flex justify-start items-center gap-2`}>
						<TextInput getValue={getActive} handleChange={handleChange} id={'active'} name={'active'} label={"Publish Your Product...?"} component={'switch'} />
						<Chip color={ getActive ? 'error' : 'warning' } label={ getActive ? 'Publish' : 'Draft' } onDelete={() => { setActive(!getActive) }} deleteIcon={ getActive ? <PublishRounded fontSize='small' /> : <EditNoteRounded fontSize='small' /> } />
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
