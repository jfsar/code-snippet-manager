import { useMutation } from "@tanstack/react-query";
import { updateSnippet } from "../../services/snippets";

export function useUpdateSnippet() {
  const {
    mutate: updateSnippetMutation,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: ({
      id,
      title,
      content,
      syntax,
      tags,
      visibility,
    }: {
      id: string;
      title?: string;
      content?: string;
      syntax?: string;
      tags?: string[];
      visibility?: "public" | "private";
    }) => updateSnippet(id, { title, content, syntax, tags, visibility }),
  });

  return {
    updateSnippetMutation,
    isPending,
    isError,
    error,
  };
}
