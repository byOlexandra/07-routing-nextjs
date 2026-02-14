import NotesClient from './Notes.client';
import { getNotesByTag } from '@/lib/api'

interface Props {
    params: Promise<{ slug: string[] }>
}

export default async function NotesByTag({ params }: Props) {
    const { slug } = await params;
    const tag = slug[0] === 'all' ? undefined : slug[0];
    const { notes } = await getNotesByTag(tag);

    return (
        <div>
            <NotesClient notes={notes} />
        </div>

    )
}