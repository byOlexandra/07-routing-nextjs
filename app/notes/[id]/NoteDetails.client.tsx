"use client"

import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import css from '@/app/@modal/(.)notes/[id]/NotePreview.module.css'


interface NoteDetailsClientProps {
    id: string
}

export default function NoteDetailsClient({ id }: NoteDetailsClientProps) {
    const { data: note } = useQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(id),
        refetchOnMount: false,
    })

    if (!note) return null;

    return (
        <>
            <h2 className={css.header}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>{note.createdAt}</p>
            <p className={css.tag}>{note.tag}</p>
        </>
    );
}

