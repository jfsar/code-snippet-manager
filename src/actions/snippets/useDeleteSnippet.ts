import { useMutation } from "@tanstack/react-query";
import { deleteSnippet as deleteById } from "../../services/snippets";

export function useDeleteSnippet() {
  const {
    mutate: deleteSnippet,
    error,
    isPending,
  } = useMutation({
    mutationFn: (id: string) => deleteById(id),
  });

  if (error) {
    throw new Error(error.message);
  }

  return {
    deleteSnippet,
    isPending,
  };
}
