import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerAccount } from "../../services/auth";
import { useNavigate } from "react-router-dom";

export function useSignUp() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: signup, isPending } = useMutation({
    mutationFn: registerAccount,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data?.user);
      navigate("/", { replace: true });
    },
  });

  return { signup, isLoading: isPending };
}
