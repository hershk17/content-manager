import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RootState } from "../../../stores/Store";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate("/");
  //   }
  // }, [isAuthenticated, navigate]);

  const API_URL = import.meta.env.VITE_SERVER_URL;
  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    console.log("something clicked i guess");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          height: "100%",
        }}
      >
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign in to Content Manager</Typography>

          <Typography variant="subtitle2" sx={{ mt: 2, mb: 5 }}>
            Don't have an account?
            <Link sx={{ ml: 0.5 }} onClick={handleRegisterClick}>
              Get started
            </Link>
          </Typography>

          <Button
            fullWidth
            variant="outlined"
            size="large"
            onClick={handleGoogleLogin}
          >
            <GoogleIcon sx={{ mr: 1 }} /> Sign In with Google
          </Button>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              OR
            </Typography>
          </Divider>

          <Stack spacing={3}>
            <TextField name="email" label="Email address" />

            <TextField
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            sx={{ mt: 2, mb: 3 }}
          >
            <Link variant="subtitle2" underline="hover">
              Forgot password?
            </Link>
          </Stack>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            onClick={handleClick}
          >
            Login
          </LoadingButton>
        </Card>
      </Stack>
    </>
  );
};

export default Login;
