import {
  Anchor,
  Box,
  Button,
  Divider,
  Group,
  PasswordInput,
  Text,
  TextInput,
  Title,
  rem,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDocumentTitle } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconAt, IconBrandGoogleFilled, IconLock } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";

import { useLoginMutation } from "@/features/auth/authApi";

interface FormProps {
  email: string;
  password: string;
}

export const Login = () => {
  useDocumentTitle("Login | Nexus");

  const API_URL = import.meta.env.VITE_SERVER_URL;
  const [loginUser] = useLoginMutation();

  const navigate = useNavigate();

  const form = useForm<FormProps>({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => {
        if (!/^\S+@\S+$/.test(value)) {
          return "Please enter a valid email";
        }
        return null;
      },
      password: (value) => {
        if (value.length === 0) {
          return "Please enter a password";
        }
        return null;
      },
    },
  });

  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  const handleEmailLogin = async (userData: FormProps) => {
    loginUser(userData)
      .unwrap()
      .then(() => {
        navigate("/library");
        notifications.show({
          title: "Logged in successfully",
          color: "green",
          message: "Welcome back!",
        });
      })
      .catch((response) => {
        notifications.show({
          title: "Error logging in",
          color: "red",
          message:
            response?.data || "Please check your credentials and try again",
        });
      });
  };

  return (
    <Box maw={400} mx="auto" my="xl">
      <Title order={1} mb="xs">
        Sign in to Nexus
      </Title>
      <Text c="dimmed" mb="xl">
        Don't have an account?{" "}
        <Anchor component={Link} to="/register" unstable_viewTransition>
          Get Started
        </Anchor>
      </Text>

      <form onSubmit={form.onSubmit(handleEmailLogin)}>
        <TextInput
          variant="filled"
          label="Email"
          placeholder="your@email.com"
          autoComplete="username"
          size="md"
          mt="md"
          styles={{ label: { fontSize: rem(14) } }}
          leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
          {...form.getInputProps("email")}
        />
        <PasswordInput
          variant="filled"
          label="Password"
          placeholder="enter your password"
          autoComplete="on"
          size="md"
          mt="md"
          styles={{ label: { fontSize: rem(14) } }}
          leftSection={<IconLock style={{ width: rem(16), height: rem(16) }} />}
          {...form.getInputProps("password")}
        />
        <Group justify="flex-end" mt="sm">
          <Anchor
            component={Link}
            to="/forgot-password"
            unstable_viewTransition>
            <Text size="sm">Forgot password?</Text>
          </Anchor>
        </Group>
        <Button type="submit" size="md" mt="xl" fullWidth>
          Login
        </Button>
      </form>
      <Divider my="xl" label="Or" labelPosition="center" />
      <Button
        variant="outline"
        leftSection={<IconBrandGoogleFilled size={14} />}
        size="md"
        fullWidth
        onClick={handleGoogleLogin}>
        Sign in with Google
      </Button>
    </Box>
  );
};
