import {
  Anchor,
  Box,
  Button,
  Divider,
  Flex,
  Group,
  PasswordInput,
  Text,
  TextInput,
  Title,
  rem,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconAt, IconBrandGoogleFilled, IconLock } from "@tabler/icons-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../authApi";

interface FormProps {
  email: string;
  password: string;
}

export const Login = () => {
  const API_URL = import.meta.env.VITE_SERVER_URL;
  const [loginUser] = useLoginMutation();

  const form = useForm<FormProps>({
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

  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  const handleEmailLogin = async (userData: FormProps) => {
    loginUser(userData)
      .unwrap()
      .then(() => {
        notifications.show({
          title: "Logged in successfully",
          color: "green",
          message: "Redirecting you to the dashboard...",
        });
        // navigate("/dashboard");
      })
      .catch(() => {
        notifications.show({
          title: "Error logging in",
          color: "red",
          message: `Please check your credentials and try again.`,
        });
      });
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Box maw={360} mx="auto">
        <Title order={2} mt="xl">
          Sign in to Nexus
        </Title>
        <Flex mb="xl" mt="xs">
          <Text size="sm" c="dimmed">
            Don't have an account?{" "}
            <Anchor component={Link} to="/register">
              Get Started
            </Anchor>
          </Text>
        </Flex>
        <form onSubmit={form.onSubmit(handleEmailLogin)}>
          <TextInput
            variant="filled"
            size="md"
            placeholder="your@email.com"
            leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
            {...form.getInputProps("email")}
          />
          <PasswordInput
            variant="filled"
            size="md"
            placeholder="password"
            mt="sm"
            leftSection={
              <IconLock style={{ width: rem(16), height: rem(16) }} />
            }
            {...form.getInputProps("password")}
          />
          <Group justify="flex-end" mt="sm">
            <Anchor component={Link} to="/forgot-password">
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
          onClick={handleGoogleLogin}
        >
          Sign in with Google
        </Button>
      </Box>
    </>
  );
};
