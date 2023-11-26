import { Avatar, Button, Menu, rem } from "@mantine/core";
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

import { useLogoutMutation, useValidateQuery } from "@/features/auth/authApi";
import { baseApi } from "@/stores/store";

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
        }}>
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
            <Avatar
              src={user.avatar}
              alt="Profile Picture"
              size="sm"
              color="violet">
              {user.name.substring(0, 2).toUpperCase()}
            </Avatar>
          }
          rightSection={<IconChevronDown style={{ width: rem(16) }} />}>
          {user.name}
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Manage Account</Menu.Label>
        <Menu.Item leftSection={<IconUser width={rem(16)} height={rem(16)} />}>
          Profile
        </Menu.Item>
        <Menu.Item
          leftSection={<IconMessageCircle width={rem(16)} height={rem(16)} />}>
          Messages
        </Menu.Item>
        <Menu.Item
          leftSection={<IconSettings width={rem(16)} height={rem(16)} />}>
          Settings
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          color="red"
          leftSection={<IconTrash width={rem(16)} height={rem(16)} />}
          onClick={() => {
            logout().then(() => {
              dispatch(baseApi.util.resetApiState());
            });
          }}>
          Sign out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
