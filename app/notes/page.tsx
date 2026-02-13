import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesDetailsClient from "./Notes.client";

export default async function Notes() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["notes", { searchQuery: '' }, { currentPage: 1 }],
        queryFn: () => fetchNotes('', 1),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesDetailsClient />
        </HydrationBoundary>
    );
}

