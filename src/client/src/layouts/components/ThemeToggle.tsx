import { ActionIcon, Tooltip, useMantineColorScheme } from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";

export const ThemeToggle = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  return colorScheme === "dark" ? (
    <Tooltip label="Light mode">
      <ActionIcon
        variant="default"
        size="lg"
        radius="md"
        aria-label="Toggle light mode"
        onClick={() => setColorScheme("light")}>
        <IconSun style={{ width: "70%", height: "70%" }} stroke={1.5} />
      </ActionIcon>
    </Tooltip>
  ) : (
    <Tooltip label="Dark mode">
      <ActionIcon
        variant="default"
        size="lg"
        radius="md"
        aria-label="Toggle dark mode"
        onClick={() => setColorScheme("dark")}>
        <IconMoon style={{ width: "70%", height: "70%" }} stroke={1.5} />
      </ActionIcon>
    </Tooltip>
  );
};
