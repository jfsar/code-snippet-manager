import * as React from "react";
import { Outlet } from "react-router-dom";
import MainAppBar from "../navigation/MainAppBar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

export default function AppLayout() {
  return (
    <React.Fragment>
      <MainAppBar />
      <Container maxWidth="lg" sx={{ m: "0 auto" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            paddingBlock: 5,
          }}
        >
          <Outlet />
        </Box>
      </Container>
    </React.Fragment>
  );
}
