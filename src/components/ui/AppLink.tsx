import { Link as RouterLink } from "react-router-dom";
import { Link as MuiLink, type LinkProps as MuiLinkProps } from "@mui/material";
import { type LinkProps as RouterLinkProps } from "react-router-dom";

type AppLinkProps = Omit<MuiLinkProps, "href"> &
  Pick<RouterLinkProps, "to" | "replace" | "state" | "relative">;

const AppLink = ({
  to,
  replace,
  state,
  relative,
  children,
  ...muiProps
}: AppLinkProps) => (
  <MuiLink
    component={RouterLink}
    to={to}
    replace={replace}
    state={state}
    relative={relative}
    {...muiProps}
  >
    {children}
  </MuiLink>
);

export default AppLink;
