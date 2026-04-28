import { useQuery } from "@tanstack/react-query";
import { getSnippetById } from "../../services/snippets";

export function useGetSnippetById(snippetId: string) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["snippet", snippetId],
    queryFn: () => getSnippetById(snippetId),
  });

  return {
    snippet: data,
    error,
    isLoading,
  };
}
