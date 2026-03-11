'use client';

import Lenis from 'lenis';
import Masonry from '@mui/lab/Masonry';
import Button from '@mui/material/Button';
import { AnimatePresence } from "framer-motion";
import { useLayoutEffect, useState, useEffect } from "react";
import PreloaderPage from '@/app/components/Preloader/PreloaderPage';
import styles from "@/app/(front-end)/earthline-made/products/style.module.scss";
import HowToOrder from '@/app/(front-end)/earthline-made/components/HowToOrder/HowToOrder';
import AddEditModal from "@/app/admin/earthline-made/components/AddEditModal/AddEditModal";
import ProductCard from '@/app/(front-end)/earthline-made/components/productCard/ProductCard';
import CreateFolderModal from "@/app/admin/earthline-made/components/CreateFolderModal/CreateFolderModal";
import DeleteConfirmation from "@/app/admin/earthline-made/components/DeleteConfirmation/DeleteConfirmation";

// type ProductType = { folder: string; product: string; description: string; images: { secure_url: string; public_id: string; }[];};
type ProductType = { id: string; folder: string; product: string; description: string; images: { secure_url: string; public_id: string }[]; };

export default function Page() {

	// modal for how to order
	const handleOpen = () => setOpen(true);
	const [open, setOpen] = useState(false);
	const handleClose = () => setOpen(false);
	// modal for add new product
	const handleOpenP = () => setOpenP(true);
	const [openP, setOpenP] = useState(false);
	const handleCloseP = () => { setProductName(""); setProductDescription(""); setFolderName(""); setFiles([]); setPreviews([]); setOpenP(false) };
	// Variables
	const [getLoader, setLoader] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [products, setProducts] = useState<ProductType[]>([]);

	// Edit State
	const [editProduct, setEditProduct] = useState<ProductType | null>(null);

	// Delete Confirmation
	const [deleteOpen, setDeleteOpen] = useState(false);
	const [deleteTarget, setDeleteTarget] = useState<ProductType | null>(null);

	// New Folder Creations
	const [folderError, setFolderError] = useState("");
	const [newFolderName, setNewFolderName] = useState("");
	const [createFolderOpen, setCreateFolderOpen] = useState(false);
	const [folderOptions, setFolderOptions] = useState<string[]>([]);

	const words: string[] = [ "Our Products...!", "Nos Produits...!", "I Nostri Prodotti...!", "Nossos Produtos...!", "Nuestros Productos...!", "Unsere Produkte...!", "Onze Producten...!", "Våra Produkter...!", "私たちの製品...!", "منتجاتنا...!", "우리의 제품...!", "我们的产品...!", "हमारे उत्पाद...!", "અમારા ઉત્પાદનો...!"];

	const [files, setFiles] = useState<File[]>([]);
	const [folderName, setFolderName] = useState("");
	const [previews, setPreviews] = useState<string[]>([]);
	const [productDescription, setProductDescription] = useState("");
	const [uploadProgress, setUploadProgress] = useState<number[]>([]);

	// Variables for add new product
	const [productName, setProductName] = useState("");

	useLayoutEffect(() => {
		const fetchProducts = async () => {
			try {
				const res = await fetch("/admin/earthline-made/api/getAllProducts?limit=all");
				const data = await res.json();
				const productsArray = Array.isArray(data) ? data : data.products || data.data || [];
				setProducts(productsArray);
			}
			catch (error) { console.error("Failed to fetch products:", error); }
		};

		fetchProducts();
	}, []);

	// API to fetch Folder Names
	const fetchFolders = async () => {
		try {
			const res = await fetch("/admin/earthline-made/api/getFolders");
			const data = await res.json();
			setFolderOptions(data.map((f: any) => f.name.toLowerCase()));
		}
		catch (err) { console.error("Failed to fetch folders:", err); }
	};

	useEffect(() => { fetchFolders(); }, []);


	// Handling new Folder Name Logic
	useEffect(() => {
		if (folderName === "__new__") {
			const name = prompt("Enter new folder name");
			if (name) setFolderName(name.toLowerCase().replace(/\s+/g, "-"));
			else setFolderName("");
		}
	}, [folderName]);


	useEffect( () => {
		const lenis = new Lenis()

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		function raf(time: any) {
			lenis.raf(time)
			requestAnimationFrame(raf)
		}
		setTimeout( () => { setIsLoading(false); document.body.style.cursor = 'default'; window.scrollTo(0,0); }, 3000)

		requestAnimationFrame(raf)
	}, []);

	// Edit Product Logic
	const handleSubmitProduct = async () => editProduct? await handleEditProduct() : await handleCreateProduct();

	// Submit ulpoad Logic
	const handleCreateProduct = async () => {
		if (!productName || !folderName || !productDescription || files.length === 0) { alert("Folder name, product name, description and images required"); return; }

		setLoader(true);

		const formData = new FormData();
		formData.append("folderName", folderName);
		formData.append("productName", productName);
		formData.append("productDescription", productDescription);

		files.forEach((file) => formData.append("files", file) );

		try {
			const xhr = new XMLHttpRequest();

			xhr.open("POST", "/admin/earthline-made/api/upload");

			xhr.upload.onprogress = (event) => {
				if (event.lengthComputable) {
					const percent = Math.round((event.loaded / event.total) * 100);
					setUploadProgress(files.map(() => percent));
				}
			};

			xhr.onload = async () => {
				if (xhr.status === 200) {
					const data = JSON.parse(xhr.responseText);

					// Make the product with the new data
					const newProduct: ProductType = {
						id: data.product.id,
						folder: data.product.folder,
						product: data.product.product,
						description: data.product.description ?? "No Description Provided...!",
						images: data.product.images.map((img: any) => ({ secure_url: img.secure_url, public_id: img.public_id, })),
					};

					// Add the new product to the list of products
					setProducts(prev => [newProduct, ...prev])

					setFiles([]);
					setPreviews([]);
					setProductName("");
					setProductDescription("");
					setFolderName("");
					setUploadProgress([]);

					await fetchFolders();
					handleCloseP();
				}
				else alert("Upload failed");

				setLoader(false);
			};

			xhr.onerror = () => { alert("Upload error"); setLoader(false); };

			xhr.send(formData);
		} 
		catch (err) {
			console.error(err);
			setLoader(false);
		}
	};

	// Cleanup for preview memory
	useEffect(() => {
		return () => {
			previews.forEach((url) => URL.revokeObjectURL(url));
		};
	}, [previews]);

	// Folder Duplication Check Logic
	const handleCreateFolder = () => {
		const cleaned = newFolderName.trim().toLowerCase().replace(/\s+/g, "-");
		if (!cleaned) { setFolderError("Folder name cannot be empty"); return; }
		if (folderOptions.includes(cleaned)) { setFolderError("Folder already exists"); return; }
		setFolderName(cleaned);
		setFolderOptions((prev) => [...prev, cleaned]);
		setCreateFolderOpen(false);
		setNewFolderName("");
		setFolderError("");
	};


	// Edit Handler
	const handleEditClick = (product: ProductType) => {
		setEditProduct(product)
		setProductName(product.product)
		setProductDescription(product.description)
		setFolderName(product.folder)
		setFiles([])
		setPreviews(product.images.map(i => i.secure_url))
		setOpenP(true)
	}

	// Edit API Handler
	const handleEditProduct = async () => {

		if (!editProduct) return;

		setLoader(true);

		const formData = new FormData();
		formData.append("id", editProduct.id);
		formData.append("folderName", folderName);
		formData.append("productName", productName);
		formData.append("productDescription", productDescription);

		formData.append( "existingImages", JSON.stringify( editProduct.images.map(img => ({ public_id: img.public_id, secure_url: img.secure_url })) ) );

		files.forEach(file => formData.append("files", file));

		const res = await fetch("/admin/earthline-made/api/edit", { method: "PATCH", body: formData });

		const data = await res.json();

		if (!res.ok) { alert("Update failed"); setLoader(false); return; }

		const updatedProduct: ProductType = { id: data.product.id, folder: data.product.folder, product: data.product.product, description: data.product.description, images: data.product.images };

		setProducts(prev => prev.map(p => p.folder === editProduct.folder && p.product === editProduct.product ? updatedProduct : p ) )

		setEditProduct(null);
		setFiles([]);
		setPreviews([]);
		setUploadProgress([]);
		setLoader(false);

		handleCloseP();
	}


	// Delete Handler
	const handleDeleteClick = (product: ProductType) => {
		setDeleteTarget(product);
		setDeleteOpen(true);
	};

	// Confirm Delete Function
	const confirmDelete = async () => {
		if (!deleteTarget) return;

		await fetch("/admin/earthline-made/api/delete", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				folderName: deleteTarget.folder,
				productName: deleteTarget.product
			}),
		});

		setProducts(prev =>
			prev.filter(
				p => !(p.folder === deleteTarget.folder && p.product === deleteTarget.product)
			)
		);

		setDeleteOpen(false);
		setDeleteTarget(null);
	};


	return (
		<>
			<AnimatePresence mode='wait'> {isLoading && <PreloaderPage words={ words } caller='earthline-made' />} </AnimatePresence>
			<div className={styles.mainAdmin}>
				<div className={styles.titleMain}>
					<h1 className={styles.title}>
						{ `Shop` }
					</h1>
					<div className={`flex items-center justify-center gap-10 max-[786px]:gap-2`}>
						<Button variant="contained" onClick={handleOpen}>
							<p className={`text-lg max-[786px]:text-[12px]`}>{`How to Order`}</p>
						</Button>
						<Button variant="contained" onClick={handleOpenP}>
							<p className={`text-lg max-[786px]:text-[12px]`}>{`Add New Product`}</p>
						</Button>
					</div>
				</div>

				{/* <div className={styles.filter}>
					<span>Filter</span>
				</div> */}

				{ products.length === 0 && <div style={{ textAlign: "center", padding: "40px" }}> {`No products found`} </div> }

				<Masonry columns={{ xs: 1 }} spacing={{ xs: 1 }} className={`m-0!`}>
					{
						products.map((product, index) => (
							<ProductCard
								key={`${product.folder}-${product.product}`}
								product={product}
								index={index}
								pageReady={!isLoading}
								caller="admin"
								onEdit={() => handleEditClick(product)}
								onDelete={() => handleDeleteClick(product)}
							/>
						))
					}
				</Masonry>

			</div>

			<HowToOrder open={open} handleClose={handleClose} />

			<AddEditModal open={openP} handleClose={handleCloseP} getLoader={getLoader} productName={productName} setProductName={setProductName} productDescription={productDescription} setProductDescription={setProductDescription} folderName={folderName} setFolderName={setFolderName} folderOptions={folderOptions} setCreateFolderOpen={setCreateFolderOpen} files={files} setFiles={setFiles} previews={previews} setPreviews={setPreviews} uploadProgress={uploadProgress} handleSubmitProduct={handleSubmitProduct} />

			<CreateFolderModal open={createFolderOpen} onClose={() => setCreateFolderOpen(false)} newFolderName={newFolderName} setNewFolderName={setNewFolderName} folderError={folderError} setFolderError={setFolderError} handleCreateFolder={handleCreateFolder} />

			<DeleteConfirmation deleteOpen={deleteOpen} setDeleteOpen={setDeleteOpen} deleteTarget={deleteTarget} confirmDelete={confirmDelete} />

		</>
	);
}