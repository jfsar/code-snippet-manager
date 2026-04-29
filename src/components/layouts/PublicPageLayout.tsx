import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUser } from "../../actions/auth/useUser";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import FullScreenSpinner from "../spinners/FullScreenSpinner";
import MainAppBar from "../navigation/MainAppBar";

export default function PublicPageLayout() {
  const { isAuthenticated, isLoading } = useUser();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return <FullScreenSpinner isLoading={isLoading} />;
  }

  return (
    <React.Fragment>
      <MainAppBar />
      <Container maxWidth="md" sx={{ m: "0 auto" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            paddingBlock: 15,
          }}
        >
          <Outlet />
        </Box>
      </Container>
    </React.Fragment>
  );
}
