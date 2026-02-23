'use client';

import React from 'react';
import styles from '@/app/components/Projects/components/project/style.module.scss';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProjectPage({index, title, manageModal}: any) {

    return (
        <div onMouseEnter={(e) => {manageModal(true, index, e.clientX, e.clientY)}} onMouseLeave={(e) => {manageModal(false, index, e.clientX, e.clientY)}} className={styles.project}>
            <h2>{title}</h2>
            <p>Design & Development</p>
        </div>
    )
}
