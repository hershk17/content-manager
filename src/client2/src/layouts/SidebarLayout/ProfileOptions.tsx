import { Button, Image, Menu, rem } from "@mantine/core";
import {
  IconChevronDown,
  IconLogin2,
  IconMessageCircle,
  IconSettings,
  IconTrash,
  IconUser,
} from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  authApi,
  useLogoutMutation,
  useValidateQuery,
} from "../../features/auth/authApi";

export const ProfileOptions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: user, isLoading } = useValidateQuery();
  const [logout] = useLogoutMutation();

  if (isLoading || !user) {
    return (
      <Button
        size="md"
        variant="default"
        radius="md"
        rightSection={<IconLogin2 style={{ width: rem(16) }} />}
        onClick={() => {
          navigate("/login");
        }}
      >
        Sign in
      </Button>
    );
  }

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button
          size="md"
          variant="default"
          radius="md"
          leftSection={
            user.avatar ? (
              <Image radius="xl" src={user.avatar} h={rem(25)} w={rem(25)} />
            ) : (
              <IconUser style={{ width: rem(25) }} />
            )
          }
          rightSection={<IconChevronDown style={{ width: rem(16) }} />}
        >
          {user.name ? user.name : user.username}
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Manage Account</Menu.Label>
        <Menu.Item
          leftSection={<IconUser style={{ width: rem(14), height: rem(14) }} />}
        >
          Profile
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconMessageCircle style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Messages
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconSettings style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Settings
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          color="red"
          leftSection={
            <IconTrash style={{ width: rem(14), height: rem(14) }} />
          }
          onClick={() => {
            logout().then(() => {
              dispatch(authApi.util.resetApiState());
            });
          }}
        >
          Sign out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
