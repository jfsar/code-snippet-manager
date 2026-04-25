import { QueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/auth";

export function useLogin() {
  const queryClient = new QueryClient();
  const navigate = useNavigate();
  const {
    mutate: login,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: loginUser,
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user?.user);
      navigate("/", { replace: true });
    },
  });

  return {
    login,
    isLoading: isPending,
    isError,
    message: error instanceof Error ? error.message : "An error occurred",
  };
}
