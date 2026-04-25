import * as React from "react";
import { Outlet } from "react-router-dom";
import MainAppBar from "../navigation/MainAppBar";

export default function AppLayout() {
  return (
    <React.Fragment>
      <MainAppBar />
      <Outlet />
    </React.Fragment>
  );
}
