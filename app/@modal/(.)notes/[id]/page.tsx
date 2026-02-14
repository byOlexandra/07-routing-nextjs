import { fetchNoteById } from "@/lib/api";
import ModalWrapper from './ModalWrapper';

interface Props {
    params: Promise<{ id: string }>
}

export default async function NotePreview({ params }: Props) {
    const { id } = await params;
    const note = await fetchNoteById(id);

    return (
        <>
            <ModalWrapper>
                <h2>{note.title}</h2>
                <p>{note.content}</p>
                <p>{note.tag}</p>
            </ModalWrapper>

        </>
    );
}