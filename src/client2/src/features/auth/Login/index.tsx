import {
  Box,
  Button,
  Group,
  PasswordInput,
  Text,
  TextInput
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { RootState } from "../../../stores/store";

export const Login = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => {
        if (value.length === 0) {
          return "Please enter an email";
        }

        if (/^\S+@\S+$/.test(value)) {
          return null;
        }

        return "Please enter a valid email";
      },
      password: (value) => {
        if (value.length === 0) {
          return "Please enter a password";
        }

        return null;
      },
    },
  });

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
      <Box maw={360} mx="auto">
        <Text size="xl" fw={600} my="xl">
          Sign in to Nexus
          <Text size="sm" c="dimmed" mt="xs">
            Don't have an account? <Link to="register">Get started</Link>
          </Text>
        </Text>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <TextInput
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Password"
            mt="sm"
            {...form.getInputProps("password")}
          />
          <Group justify="flex-end" mt="sm">
            <Text size="sm" c="dimmed">
              <Link to="forgot-password">Forgot password?</Link>
            </Text>
          </Group>
          <Button
            type="submit"
            variant="light"
            color="violet"
            mt="xl"
            fullWidth
          >
            Login
          </Button>
        </form>
      </Box>
    </>
  );
};
