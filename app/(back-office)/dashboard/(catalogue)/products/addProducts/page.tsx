'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { generateSlug } from '@/app/lib/generateSlug';
import TagsInput from '@/components/Inputs/TagsInput';
import { makePostRequest } from '@/app/lib/apiRequest';
import { Loading } from '@/components/Loading/Loading';
import { TextInput } from '@/components/Inputs/TextInput';
import { Buttons } from '@/components/Inputs/SubmitButton';
import { ImageUpload } from '@/components/Inputs/ImageUpload';
import { Alerts } from '@/components/Inputs/AlertsAndSnackBars/Alerts';
import { Snackbars } from '@/components/Inputs/AlertsAndSnackBars/Snackbars';
import { Card, CardActions, CardContent, CardHeader, Chip } from '@mui/material';
import { AddCircleRounded, Category, CloseRounded, CurrencyRupeeRounded, DescriptionRounded, EditNoteRounded, Groups3, InventoryRounded, ProductionQuantityLimitsRounded, PublishRounded, QrCodeScannerRounded, StyleRounded } from '@mui/icons-material';


export default function NewProducts() {
	
	const router = useRouter();
	const fileRef = React.useRef();
	const [getSKU, setSKU] = React.useState(1);
	const [getTags, setTags] = React.useState(['']);
	const [getTitle, setTitle] = React.useState('');
	const [getOpen, setOpen] = React.useState(false);
	const [getError, setError] = React.useState(false);
	const [getBarcode, setBarcode] = React.useState('');
	const [getActive, setActive] = React.useState(false);
	const [getQuantity, setQuantity] = React.useState(10);
	const [getIsLoading, setIsLoading] = React.useState(true);
	const [getSalePrice, setSalePrice] = React.useState(2.99);
	const [getDescription, setDescription] = React.useState('');
	const [getSelectSeller, setSelectSeller] = React.useState('');
	const [getProductPrice, setProductPrice] = React.useState(1.99);
	const [getSelectCategory, setSelectCategory] = React.useState('');
	const [getApiResponse, setApiResponse] = React.useState({ message: '', color: '' });

	const handleChange = (event: any) => {

		const { name, value, checked } = event.target;
		switch (name) {
			case 'title': setTitle(value); break;
			case 'description': setDescription(value); break;
			case 'selectC': setSelectCategory(value); break;
			case 'selectS': setSelectSeller(value); break;
			case 'unit': setSKU(value); break;
			case 'quantity': setQuantity(value); break;
			case 'barcode': setBarcode(value); break;
			case 'productPrice': setProductPrice(value); break;
			case 'productSalePrice': setSalePrice(value); break;
			case 'active': setActive(checked); break;
			default: break;
		}
		setError(false);
	};
	
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		if(getTitle === '' || getDescription === '') setError(true);
		else
		{
			setIsLoading(true);
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



			const productData = { title: getTitle, selectCategory: getSelectCategory, selectSeller: getSelectSeller, sku: getSKU, quantity: getQuantity, barcode: getBarcode, productPrice: getProductPrice, salePrice: getSalePrice, slug: slug, tags: getTags, description: getDescription, image: imagePath, isActive: getActive };
			const apiResponse = await makePostRequest('http://localhost:3000/api/products', productData, 'Products');
			cleanUp();
			setApiResponse(apiResponse!);
			setOpen(true);

			setTimeout(() => {
				router.back();
			}, 2000);
		}
	}

	const uploadImage = async (fileRef: any, index: number) =>
	{
		try
		{
			const data = new FormData();
			data.set('file', fileRef);
			data.set('folder', 'Products/');
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

	const handleSelecetedTags = (items: any) => {
		setTags(items);
	}


	const cleanUp = () => {
		setSKU(1);
		setTags(['']);
		setTitle('');
		setOpen(false);
		setBarcode('');
		setQuantity(10);
		setSalePrice(2.99);
		setDescription('');
		setSelectSeller('');
		setProductPrice(1.99);
		setSelectCategory('');
	}


	return (
		<div className={`w-full flex justify-center items-center min-[950px]:p-5 p-2`}>
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

									<div className={`flex justify-center items-start w-full gap-5 max-[950px]:flex-col`}>
										<TextInput handleChange={handleChange} getValue={getTitle} placeholder={'Product Title...!'} id={'title'} name={'title'} label={"Product"} component={'text'} icon={<StyleRounded />} />
										<TextInput handleChange={handleChange} getValue={getSelectCategory} placeholder={'Select Category...!'} id={'selectC'} name={'selectC'} label={"Select Category"} component={'select'} icon={<Category />} selectMenu={selectMenuDataCategory} />
										<TextInput handleChange={handleChange} getValue={getSelectSeller} placeholder={'Select Seller...!'} id={'selectS'} name={'selectS'} label={"Select Seller"} component={'select'} icon={<Groups3 />} selectMenu={selectMenuDataSeller} />
									</div>

									<div className={`flex justify-center items-start w-full gap-5 max-[950px]:flex-col`}>
										<TextInput handleChange={handleChange} getValue={getSKU} placeholder={'Stock Keeping Unit...!'} id={'unit'} name={'unit'} label={"Stock Keeping Unit"} component={'number'} type={'number'} icon={<InventoryRounded />} />
										<TextInput handleChange={handleChange} getValue={getQuantity} placeholder={'Stock Quantity...!'} id={'quantity'} name={'quantity'} label={"Quantity"} component={'number'} type={'number'} icon={<ProductionQuantityLimitsRounded />} />
										<TextInput handleChange={handleChange} getValue={getBarcode} placeholder={'Barcode...!'} id={'barcode'} name={'barcode'} label={"Barcode"} component={'text'} icon={<QrCodeScannerRounded />} />
									</div>

									<div className={`flex justify-center items-start w-full gap-5 max-[950px]:flex-col`}>
										<TextInput handleChange={handleChange} getValue={getProductPrice} placeholder={'Product Price...!'} id={'productPrice'} name={'productPrice'} label={"Product Price"} component={'currency'} type={'number'} icon={<CurrencyRupeeRounded />} />
										<TextInput handleChange={handleChange} getValue={getSalePrice} placeholder={'Product Sale Price...!'} id={'productSalePrice'} name={'productSalePrice'} label={"Product Sale Price"} component={'currency'} type={'number'} icon={<CurrencyRupeeRounded />} />
									</div>

									<TagsInput selectedTags={handleSelecetedTags} placeholder="Add Tags (Press Enter after every hashtag)" />

									<div className={`flex justify-center items-center w-full gap-5 max-[950px]:flex-col`}>
										<ImageUpload maxFileSize={1048576} limit={5} fileRef={ fileRef } dropzoneText={"Drag and drop an image here or click to upload Product Image...!"} showPreviewsInDropzone={true} showPreviews={false} />
										<TextInput getValue={getDescription} handleChange={handleChange} placeholder={'Product Description...!'} id={'description'} name={'description'} label={"Description"} component={'textArea'} icon={<DescriptionRounded fontSize='large' />} />
									</div>


								</CardContent>

								
								<CardActions className={`flex justify-between items-center max-[950px]:flex-col gap-5 w-full`}>
									<div className={`flex justify-start items-start flex-row max-[1200px]:flex-col w-full ml-8 mb-8 gap-5`}>
										<TextInput getValue={getActive} handleChange={handleChange} id={'active'} name={'active'} label={"Publish Your Product...?"} component={'switch'} />
										<Chip color={ getActive ? 'error' : 'warning' } label={ getActive ? 'Publish' : 'Draft' } onDelete={() => { setActive(!getActive) }} deleteIcon={ getActive ? <PublishRounded fontSize='small' /> : <EditNoteRounded fontSize='small' /> } />
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
