import { Badge, Box, Card, Image, Text } from "@mantine/core";
import Game from "@/models/Game";

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

interface GameCardProps {
  game: Game;
}

export const GameCard = ({ game }: GameCardProps) => {
  return (
    <Card
      key={game.appid}
      shadow="sm"
      padding="lg"
      radius="md"
      mb={50}
      w={250}
      withBorder>
      <Card.Section>
        <Image
          src={`https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/header.jpg`}
          alt={"Game cover"}
        />
      </Card.Section>

      <Box my="md">
        <Text fw={500} truncate="end">
          {game.name}
        </Text>
        <Text fw={500} c="dimmed">
          {Math.round(game.playtime_forever / 60)} hours
        </Text>
      </Box>

      <Badge color={statuses[game.appid % 3].color} variant="light">
        {statuses[game.appid % 3].label}
      </Badge>
    </Card>
  );
};
