'use client';

import { Note } from '@/types/note';
import SearchBox from "@/components/SearchBox/SearchBox";
import css from "./Notes.client.module.css";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import Pagination from "@/components/Pagination/Pagination";
import { Toaster } from "react-hot-toast";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";

interface NotesClientProps {
    notes: Note[];
    activeTag: string | undefined,
}

export default function NotesClient({ notes: initialNotes, activeTag }: NotesClientProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const debouncedSetSearchQuery = useDebouncedCallback((value: string) => {
        setSearchQuery(value)
        setCurrentPage(1);
    }, 300);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const openModal = () => setIsOpenModal(true);
    const closeModal = () => setIsOpenModal(false);

    const { data, error, isError } = useQuery({
        queryKey: ["notes", searchQuery, currentPage, activeTag],
        queryFn: () => fetchNotes(searchQuery, currentPage, activeTag),
        refetchOnMount: false,
        placeholderData: keepPreviousData,
        initialData: (searchQuery === "" && currentPage === 1)
            ? { notes: initialNotes, totalPages: 1 }
            : undefined,
        retry: false,
    })

    if (isError) {
        throw error
    }

    const displayNotes = data?.notes || initialNotes;
    const totalPages = data?.totalPages || 0;

    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox text={searchQuery} onSearch={debouncedSetSearchQuery} />
                {totalPages > 0 && (
                    <Pagination
                        changePage={setCurrentPage}
                        page={currentPage}
                        totalPg={totalPages}
                    />
                )}
                <button className={css.button} onClick={openModal}>
                    Create note +
                </button>
            </header>
            <Toaster />
            {
                displayNotes.length > 0 && (
                    <NoteList notes={displayNotes} />
                )
            }
            {
                isOpenModal && (
                    <Modal onClose={closeModal}>
                        <NoteForm onClose={closeModal} />
                    </Modal>
                )
            }
        </div>
    )
}