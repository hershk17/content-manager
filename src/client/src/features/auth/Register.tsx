import {
  Anchor,
  Box,
  Button,
  Divider,
  PasswordInput,
  Text,
  TextInput,
  Title,
  rem,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDocumentTitle } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import {
  IconAt,
  IconBrandGoogleFilled,
  IconLock,
  IconUser,
} from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";

import { useLoginMutation, useRegisterMutation } from "@/features/auth/authApi";

interface FormProps {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const Register = () => {
  useDocumentTitle("Register | Nexus");

  const API_URL = import.meta.env.VITE_SERVER_URL;
  const [loginUser] = useLoginMutation();
  const [registerUser] = useRegisterMutation();

  const navigate = useNavigate();

  const form = useForm<FormProps>({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      username: (value) => {
        if (value.length < 4 || value.length > 20) {
          return "Username must be between 4 and 20 characters long";
        }
        return null;
      },
      email: (value) => {
        if (!/^\S+@\S+$/.test(value)) {
          return "Please enter a valid email";
        }
        return null;
      },
      password: (value) => {
        if (value.length < 8 || value.length > 30) {
          return "Password must be between 8 and 30 characters long";
        }
        return null;
      },
      confirmPassword: (value) => {
        if (value !== form.values.password) {
          return "Passwords do not match";
        }
        return null;
      },
    },
  });

  const handleGoogleRegister = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  const handleEmailRegister = async (userData: FormProps) => {
    let registerData = {
      username: userData.username,
      email: userData.email,
      password: userData.password,
    };
    let loginData = {
      email: userData.email,
      password: userData.password,
    };
    registerUser(registerData)
      .unwrap()
      .then(() => {
        loginUser(loginData)
          .then(() => {
            navigate("/library");
            notifications.show({
              title: "Registered successfully",
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
      })
      .catch((response) => {
        notifications.show({
          title: "Error registering",
          color: "red",
          message:
            response?.data || "Please check your credentials and try again",
        });
      });
  };

  return (
    <Box maw={400} mx="auto" my="xl">
      <Title order={1} mb="xs">
        Join Nexus
      </Title>
      <Text c="dimmed" mb="xl">
        Already have an account?{" "}
        <Anchor component={Link} to="/register" unstable_viewTransition>
          Sign In
        </Anchor>
      </Text>

      <form onSubmit={form.onSubmit(handleEmailRegister)}>
        <TextInput
          variant="filled"
          label="Display Name"
          placeholder="enter a display name"
          size="md"
          mt="md"
          styles={{ label: { fontSize: rem(14) } }}
          leftSection={<IconUser style={{ width: rem(16), height: rem(16) }} />}
          {...form.getInputProps("username")}
        />
        <TextInput
          variant="filled"
          label="Email"
          placeholder="your@email.com"
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
          autoComplete="new-password"
          size="md"
          mt="md"
          styles={{ label: { fontSize: rem(14) } }}
          leftSection={<IconLock style={{ width: rem(16), height: rem(16) }} />}
          {...form.getInputProps("password")}
        />
        <PasswordInput
          variant="filled"
          label="Confirm Password"
          placeholder="repeat your password"
          size="md"
          mt="md"
          styles={{ label: { fontSize: rem(14) } }}
          leftSection={<IconLock style={{ width: rem(16), height: rem(16) }} />}
          {...form.getInputProps("confirmPassword")}
        />
        <Button type="submit" size="md" mt={rem(45)} fullWidth>
          Create Account
        </Button>
      </form>
      <Divider my="xl" label="Or" labelPosition="center" />
      <Button
        variant="outline"
        leftSection={<IconBrandGoogleFilled size={14} />}
        size="md"
        fullWidth
        onClick={handleGoogleRegister}>
        Sign in with Google
      </Button>
    </Box>
  );
};
