import { useMutation } from "@tanstack/react-query";
import { registerAccount } from "../../services/auth";

export function useSignUp() {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: registerAccount,
    onSuccess: (data) => {
      console.log(data);
    },
  });

  return { signup, isLoading: isPending };
}
