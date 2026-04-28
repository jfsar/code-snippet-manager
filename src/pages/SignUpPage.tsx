import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  TextField,
  Stack,
} from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import { useSignUp } from "../actions/auth/useSignUp";
import AppLink from "../components/ui/AppLink";

type FormValues = {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
};

export default function SignupPage() {
  const { signup, isLoading } = useSignUp();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { email: "", password: "", name: "", confirmPassword: "" },
  });

  const password = watch("password");

  const onSubmit = ({ email, name, password }: FormValues) => {
    signup({ fullName: name, email: email, password: password });
  };

  return (
    <Card variant="outlined" sx={{ width: "100%", p: 2 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Stack spacing={4}>
            <Typography
              component="h1"
              sx={{ fontSize: 25, textAlign: "center" }}
            >
              Create Account
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
            <Controller
              name="name"
              control={control}
              rules={{
                required: "Name is required",
                maxLength: { value: 20, message: "Maximum 20 characters" },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  variant="outlined"
                  error={!!errors.name}
                  helperText={errors.name?.message}
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
                minLength: { value: 8, message: "Minimum 8 characters" },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                  message: "Must include uppercase, lowercase, and a number",
                },
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

            {/* Confirm Password */}
            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match", // 👈 key part
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Confirm Password"
                  type="password"
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
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
              Already have an account?
              <AppLink to="/sign-in" sx={{ ml: 1, textDecoration: "none" }}>
                Login Here
              </AppLink>
            </Typography>
            <Button
              type="submit"
              loading={isLoading}
              variant="contained"
              size="medium"
            >
              Submit
            </Button>
          </Stack>
        </CardActions>
      </form>
    </Card>
  );
}
