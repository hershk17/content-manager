import Game from "@/models/Game";
import { Anchor, Badge, Box, Image, Text } from "@mantine/core";
import { Link } from "react-router-dom";

const statuses = [
  {
    color: "yellow",
    label: "In Progress",
  },
  {
    color: "green",
    label: "Completed",
  },
  {
    color: "red",
    label: "Dropped",
  },
];

interface LibraryCardProps {
  game: Game;
}

export const LibraryCard = ({ game }: LibraryCardProps) => {
  return (
    <Anchor
      component={Link}
      unstable_viewTransition
      to={`/games/${game.appid}`}
      style={{ textDecoration: "none" }}>
      <Image
        radius="md"
        w={220}
        src={`https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/library_600x900.jpg`}
        alt={"Game cover"}
        style={{
          viewTransitionName: `card-img${game.appid}`,
          contain: "layout",
        }}
      />
      <Box
        w={220}
        mt="xs"
        style={{ viewTransitionName: `card-content${game.appid}` }}>
        <Text fw={500} truncate="end">
          {game.name}
        </Text>
        <Text fw={500} c="dimmed">
          {Math.round(game.playtime_forever / 60)} hours
        </Text>
        <Badge color={statuses[game.appid % 3].color} variant="light">
          {statuses[game.appid % 3].label}
        </Badge>
      </Box>
    </Anchor>
  );
};
