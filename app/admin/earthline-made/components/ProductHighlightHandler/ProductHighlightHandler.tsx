'use client';

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProductHighlightHandler() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const highlightProductId = searchParams.get("product");
	useEffect(() => { if (highlightProductId) router.replace("/admin/earthline-made/products", { scroll: false }) }, [highlightProductId, router]);
	return null;
}