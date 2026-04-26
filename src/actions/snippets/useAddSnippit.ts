import { useMutation } from "@tanstack/react-query";
import { addSnippet } from "../../services/snippets";

export function useAddSnippet() {
  const {
    mutate: saveSnippet,
    error,
    isPending,
  } = useMutation({
    mutationFn: addSnippet,
  });

  return {
    saveSnippet,
    isAdding: isPending,
    errMessage:
      error instanceof Error ? error.message : "An unknown error occurred",
  };
}
