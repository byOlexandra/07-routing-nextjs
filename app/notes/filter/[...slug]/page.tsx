import NoteList from '@/components/NoteList/NoteList';
import { getNotesByTag } from '@/lib/api'

interface Props {
    params: Promise<{ slug: string[] }>
}

export default async function NotesByTag({ params }: Props) {
    const { slug } = await params;
    console.log(slug)
    const tag = slug[0] === 'all' ? undefined : slug[0];
    const { notes } = await getNotesByTag(tag);

    return (
        <div>
            <section>{notes && notes?.length > 0 && (
                <NoteList notes={notes} />
            )}</section>
        </div>

    )
}