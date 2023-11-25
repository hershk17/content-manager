import { Button, Menu, rem } from "@mantine/core";
import {
  IconMessageCircle,
  IconPhoto,
  IconSettings,
  IconTrash,
  IconUser,
} from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import {
  authApi,
  useLogoutMutation,
  useValidateQuery,
} from "../../features/auth/authApi";

export const ProfileOptions = () => {
  const dispatch = useDispatch();

  const { data: user, isLoading } = useValidateQuery();
  const [logout] = useLogoutMutation();

  if (isLoading) return null;

  if (!user) return <div>Sign In Plz</div>;

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button size="lg" leftSection={<IconPhoto size={14} />}>
          Toggle menu
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
