import {
  AppShell,
  Burger,
  Flex,
  Group,
  NavLink,
  Title,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDeviceGamepad2 } from "@tabler/icons-react";
import { Link, Outlet, useLocation } from "react-router-dom";

import { NAV_LINKS } from "@/layouts/components/NavLinks";
import { ProfileOptions } from "@/layouts/components/ProfileOptions";
import { ThemeToggle } from "@/layouts/components/ThemeToggle";
import { useValidateQuery } from "@/features/auth/authApi";

export const SidebarLayout = () => {
  const [opened, { toggle }] = useDisclosure();
  const location = useLocation();

  const { data: user, isFetching, isLoading } = useValidateQuery();

  const NavLinks = () => {
    if (isFetching || isLoading) {
      return null;
    }

    return NAV_LINKS.map((item) => {
      if (item.isProtected && !user) {
        return null;
      }

      if (item.hiddenPostAuth && user) {
        return null;
      }

      return (
        <NavLink
          component={Link}
          to={item.link}
          key={item.link}
          label={item.label}
          leftSection={<item.icon size="1rem" stroke={1.5} />}
          active={location.pathname.includes(item.link)}
          px="xl"
          py="md"
          unstable_viewTransition
        />
      );
    });
  };

  return (
    <AppShell
      header={{ height: 70 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      layout="alt"
      padding="lg">
      <AppShell.Header px="lg">
        <Flex h="100%" justify="space-between">
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
              aria-label="Toggle navigation"
            />
            <Title order={3} hiddenFrom="sm">
              Nexus Hub
            </Title>
          </Group>
          <Group>
            <ThemeToggle />
            <ProfileOptions />
          </Group>
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar>
        <Group py="xl" px="xl" my="md">
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="sm"
            aria-label="Toggle navigation"
          />
          <IconDeviceGamepad2
            stroke={2}
            style={{ height: rem(36), width: rem(36) }}
          />
          <Title order={2}>Nexus Hub</Title>
        </Group>

        {NavLinks()}
      </AppShell.Navbar>

      <AppShell.Main className="content">
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
