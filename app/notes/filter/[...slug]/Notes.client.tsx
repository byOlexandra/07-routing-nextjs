'use client';

import NoteList from '@/components/NoteList/NoteList';
import { Note } from '@/types/note';

interface NotesClientProps {
    notes: Note[];
}

export default function NotesClient({ notes }: NotesClientProps) {
    return (
        <section>
            {notes && notes.length > 0 ? (
                <NoteList notes={notes} />
            ) : (
                <p>No notes found.</p>
            )}
        </section>
    );
}