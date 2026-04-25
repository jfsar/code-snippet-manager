import { QueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/auth";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = new QueryClient();
  const { isPending, mutate: logout } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/sign-in", { replace: true });
    },
  });

  return { isLoading: isPending, logout };
}
