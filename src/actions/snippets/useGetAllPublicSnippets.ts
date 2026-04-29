import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getPublicSnippets } from "../../services/snippets";
import { PER_PAGE } from "../../lib/utils";

export function useGetAllPublicSnippets() {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const {
    data: { snippets, total } = { snippets: [], total: 0 },
    isLoading,
    error,
  } = useQuery({
    queryKey: ["public-snippets", page],
    queryFn: () => getPublicSnippets({ page }),
  });

  const pageCount = Math.ceil((total ?? 0) / PER_PAGE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["public-snippets", page + 1],
      queryFn: () => getPublicSnippets({ page: page + 1 }),
    });
  }

  if (page > pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["public-snippets", page - 1],
      queryFn: () => getPublicSnippets({ page: page - 1 }),
    });
  }

  return { isLoading, snippets, error, total };
}
