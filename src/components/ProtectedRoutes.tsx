import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../actions/auth/useUser";
import FullScreenspinner from "./spinners/FullScreenSpinner";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useUser();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/sign-in");
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return <FullScreenspinner isLoading={isLoading} />;
  }

  if (isAuthenticated) return children;

  return null;
}
