import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useSnackBarAlert } from "../../contexts/snackbar/SnackbarAlertContext";
import { updateSnippet } from "../../services/snippets";

export function useUpdateSnippet() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showSnackBar } = useSnackBarAlert();

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
