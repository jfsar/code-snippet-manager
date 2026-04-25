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

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const queryClient = new QueryClient();
  return (
    <ThemeProvider theme={darkTheme}>
      <QueryClientProvider client={queryClient}>
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
            </Route>
            <Route element={<PublicPageLayout />}>
              <Route path="/sign-in" element={<LoginPage />} />
              <Route path="/sign-up" element={<SignupPage />} />
            </Route>
            <Route path="*" element={<div>404 Page</div>} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
