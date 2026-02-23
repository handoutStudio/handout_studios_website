'use client';

import React from 'react';
import styles from '@/app/earthline-made/products/style.module.scss';

export default function ProductGrid() {
	return (
		<main className={styles.content}>
			<ul className={styles.items}>
				{Array.from({ length: 24 }, (_, i) => (
					<li className={styles.item} key={i + 1} data-product-id={i + 1}>
						<button className={styles.btnItem} data-product-id={i + 1}>
							{i + 1}
						</button>
					</li>
				))}
			</ul>
		</main>
	);
}
