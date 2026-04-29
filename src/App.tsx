import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ProtectedRoute from "./components/ProtectedRoutes";
import PublicPageLayout from "./components/layouts/PublicPageLayout";
import AppLayout from "./components/layouts/AppLayout";
import SignupPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Homepage from "./pages/Homepage";
import { SnackbarAlertProvider } from "./contexts/snackbar/SnackbarAlertContext";
import SnippetPage from "./pages/SnippetPage";
import SingleSnippetPage from "./pages/SingleSnippetPage";
import DiscoverPage from "./pages/DiscoverPage";
import EditSnippetPage from "./pages/EditSnippetPage";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <QueryClientProvider client={queryClient}>
        <SnackbarAlertProvider>
          <CssBaseline />
          <BrowserRouter>
            <Routes>
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="/" element={<Homepage />} />
                <Route path="/snippets" element={<SnippetPage />} />
                <Route
                  path="/snippets/:id/edit"
                  element={<EditSnippetPage />}
                />
              </Route>
              <Route element={<PublicPageLayout />}>
                <Route path="/sign-in" element={<LoginPage />} />
                <Route path="/sign-up" element={<SignupPage />} />
              </Route>
              <Route element={<AppLayout />}>
                <Route path="/discover" element={<DiscoverPage />} />
                <Route path="/snippets/:id" element={<SingleSnippetPage />} />
              </Route>
              <Route path="*" element={<div>404 Page</div>} />
            </Routes>
          </BrowserRouter>
        </SnackbarAlertProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
