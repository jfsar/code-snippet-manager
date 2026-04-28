import { useQuery } from "@tanstack/react-query";
import { getSnippetsByOwner } from "../../services/snippets";

export function useGetSnippetByUser(userId: string) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["snippets", userId],
    queryFn: () => getSnippetsByOwner(userId),
  });

  return {
    snippets: data,
    error,
    isLoading,
  };
}
