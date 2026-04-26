import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import type { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export type Severity = "error" | "warning" | "info" | "success";

interface SnackbarAlertProps {
  open: boolean;
  message: string;
  severity: Severity;
  autoHideDuration?: number;
  anchorOrigin?: {
    vertical: "top" | "bottom";
    horizontal: "left" | "center" | "right";
  };
  onClose?: () => void;
}

function SnackbarAlert({
  open,
  message,
  severity,
  autoHideDuration = 6000,
  anchorOrigin = { vertical: "top", horizontal: "center" },
  onClose,
}: SnackbarAlertProps) {
  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") return;
    onClose?.();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={anchorOrigin}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

// Sub-components — severity is baked in, all other props flow through
// type SubComponentProps = Omit<SnackbarAlertProps, "severity">;

// SnackbarAlert.Error = (props: SubComponentProps) => (
//   <SnackbarAlert {...props} severity="error" />
// );

// SnackbarAlert.Warning = (props: SubComponentProps) => (
//   <SnackbarAlert {...props} severity="warning" />
// );

// SnackbarAlert.Info = (props: SubComponentProps) => (
//   <SnackbarAlert {...props} severity="info" />
// );

// SnackbarAlert.Success = (props: SubComponentProps) => (
//   <SnackbarAlert {...props} severity="success" />
// );

// Compound trigger components — no props needed at call site
// function createAlertTrigger(severity: Severity) {
//   return function AlertTrigger({ message }: { message: string }) {
//     const { show } = useSnackbarAlert();
//     React.useEffect(() => {
//       show(message, severity);
//     }, []); // fires once on mount
//     return null; // renders nothing
//   };
// }

// const Alert = {
//   Error:   createAlertTrigger("error"),
//   Success: createAlertTrigger("success"),
//   Warning: createAlertTrigger("warning"),
//   Info:    createAlertTrigger("info"),
// };

export default SnackbarAlert;
