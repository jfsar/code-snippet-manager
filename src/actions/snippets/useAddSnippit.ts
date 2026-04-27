import { useMutation } from "@tanstack/react-query";
import { addSnippet } from "../../services/snippets";

export function useAddSnippet() {
  const { mutate: saveSnippet, isPending } = useMutation({
    mutationFn: addSnippet,
  });

  return {
    saveSnippet,
    isAdding: isPending,
  };
}
