'use client';

import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import css from './NotePreview.module.css'

interface NotePreviewClientProps {
    children: React.ReactNode
}

export default function NotePreview({ children }: NotePreviewClientProps) {
    const router = useRouter();

    const handleClose = () => router.back();

    return (
        <Modal onClose={handleClose}>
            <div className={css.container}>
                <button onClick={handleClose} className={css.backBtn}>
                    Close
                </button>

                {children}
            </div>
        </Modal>
    );
}