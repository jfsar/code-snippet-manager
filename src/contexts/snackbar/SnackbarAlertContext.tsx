import React from "react";
import type { Severity } from "../../components/alerts/SnackBarAlert";
import SnackbarAlert from "../../components/alerts/SnackBarAlert";

interface SnackbarState {
  open: boolean;
  message: string;
  severity: Severity;
}

interface SnackbarContexValue {
  showSnackBar: (message: string, severity: Severity) => void;
}

const SnacbarContext = React.createContext<SnackbarContexValue | undefined>(
  undefined,
);

export function SnackbarAlertProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [snackbar, setSnackbar] = React.useState<SnackbarState>({
    open: false,
    message: "",
    severity: "info",
  });

  const showSnackBar = (message: string, severity: Severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <SnacbarContext.Provider value={{ showSnackBar }}>
      {children}
      <SnackbarAlert
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleClose}
      />
    </SnacbarContext.Provider>
  );
}

export const useSnackBarAlert = (): SnackbarContexValue => {
  const context = React.useContext(SnacbarContext);
  if (!context) {
    throw new Error(
      "useSnackBarAlert must be used within a SnackbarAlertProvider",
    );
  }
  return context;
};
