import { fetchNoteById } from "@/lib/api";
import NotePreview from "./NotePreview.client";

interface Props {
    params: Promise<{ id: string }>
}

export default async function NotePreviewPage({ params }: Props) {
    const { id } = await params;
    const note = await fetchNoteById(id);

    return (
        <>
            <NotePreview>
                <h2>{note.title}</h2>
                <p>{note.content}</p>
                <p>{note.tag}</p>
            </NotePreview>

        </>
    );
}