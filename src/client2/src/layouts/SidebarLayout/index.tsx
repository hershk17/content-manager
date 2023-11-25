import { AppShell, Burger, Group, NavLink, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconDeviceGamepad2,
  IconError404,
  IconHome,
  IconLibrary,
  IconLogin,
  IconUserPlus,
} from "@tabler/icons-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { icon: IconHome, label: "Home", link: "/home" },
  { icon: IconLogin, label: "Login", link: "/login" },
  { icon: IconUserPlus, label: "Register", link: "/register" },
  { icon: IconLibrary, label: "Library", link: "/steamLibrary" },
  { icon: IconError404, label: "Not Found", link: "/404" },
];

export const SidebarLayout = () => {
  const [opened, { toggle }] = useDisclosure();
  const location = useLocation();

  const navLinks = links.map((item, index) => (
    <NavLink
      component={Link}
      to={item.link}
      unstable_viewTransition
      key={item.link}
      label={item.label}
      leftSection={<item.icon size="1rem" stroke={1.5} />}
      active={location.pathname === item.link}
      px="xl"
    />
  ));

  return (
    <>
      <AppShell
        header={{ height: 70 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        layout="alt"
        padding="lg"
      >
        <AppShell.Header px="lg">
          <Group h="100%">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
              aria-label="Toggle navigation"
            />
            <Text hiddenFrom="sm" size="xl">
              Nexus Hub
            </Text>
            <Group grow>
              <ThemeToggle />
            </Group>
          </Group>
        </AppShell.Header>

        <AppShell.Navbar>
          <Group py="xl" px="xl">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
              aria-label="Toggle navigation"
            />
            <IconDeviceGamepad2 />
            <Text size="xl">Nexus Hub</Text>
          </Group>

          {navLinks}
        </AppShell.Navbar>

        <AppShell.Main className="content">
            <Outlet />
        </AppShell.Main>
      </AppShell>
    </>
  );
};
