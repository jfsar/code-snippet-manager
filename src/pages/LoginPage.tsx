import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  TextField,
  Stack,
  Link,
  Snackbar,
} from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import { useLogin } from "../actions/auth/useLogin";
import { useSnackBarAlert } from "../contexts/snackbar/SnackbarAlertContext";

type FormValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { showSnackBar } = useSnackBarAlert();
  const { login, isLoading, isError, message } = useLogin();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: FormValues) => {
    login(
      { email: data.email, password: data.password },
      {
        onError: (error) => {
          showSnackBar(
            error.message || "Failed to login. Please try again.",
            "error",
          );
        },
      },
    );
  };

  return (
    <Card variant="outlined" sx={{ width: "100%", p: 2 }}>
      {/* <SnackBarMessageAlert error={isError} message={message} /> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Stack spacing={4}>
            <Typography
              component="h1"
              sx={{ fontSize: 25, textAlign: "center" }}
            >
              Login
            </Typography>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  variant="outlined"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  fullWidth
                />
              )}
            />
            {/* Password */}
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  fullWidth
                />
              )}
            />
          </Stack>
        </CardContent>
        <CardActions sx={{ p: 2 }}>
          <Stack
            direction="row"
            spacing={4}
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography>
              Don't have an account?
              <Link href="/sign-up" sx={{ ml: 1, textDecoration: "none" }}>
                Register Here
              </Link>
            </Typography>
            <Button
              type="submit"
              variant="contained"
              size="medium"
              loading={isLoading}
            >
              Submit
            </Button>
          </Stack>
        </CardActions>
      </form>
    </Card>
  );
}
