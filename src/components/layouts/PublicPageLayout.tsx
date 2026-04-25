import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUser } from "../../actions/auth/useUser";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import FullScreenSpinner from "../spinners/FullScreenSpinner";

export default function PublicPageLayout() {
  const { isAuthenticated, isLoading } = useUser();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return <FullScreenSpinner isLoading={isLoading} />;
  }

  return (
    <React.Fragment>
      <Container maxWidth="md" sx={{ m: "0 auto" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            paddingBlock: 25,
          }}
        >
          <Outlet />
        </Box>
      </Container>
    </React.Fragment>
  );
}
