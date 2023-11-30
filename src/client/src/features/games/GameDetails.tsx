import { Badge, Box, Flex, Image, Text, Title } from "@mantine/core";
import { Navigate, useParams } from "react-router-dom";
import { useGameDetailsQuery } from "./gamesApi";

export const GameDetails = () => {
  let { id } = useParams();
  const { data: game, isFetching } = useGameDetailsQuery(id!);

  if (!isFetching && !game) {
    return <Navigate to="/404" replace />;
  }

  console.log(game);

  return (
    <Box maw={1000} m="auto">
      <Flex align="flex-start" gap="xl" my="lg">
        <Image
          radius="md"
          w={350}
          src={`https://steamcdn-a.akamaihd.net/steam/apps/${id}/library_600x900.jpg`}
          alt={"Game cover"}
          style={{ viewTransitionName: `card-img${id}` }}
          fit="contain"
        />
        <Box style={{ viewTransitionName: `card-content${id}` }}>
          <Title>{game?.name}</Title>
          <Text c="dimmed" mb="lg">
            {game?.developers.join(", ")}
          </Text>
          {game?.genres.map((genre: { id: string; description: string }) => (
            <Badge key={genre.id} mr="xs">
              {genre.description}
            </Badge>
          ))}
          <Text mt="xl" size="lg">
            {game?.price_overview?.final_formatted}
          </Text>
          <Text mt="xl">{game?.short_description}</Text>
        </Box>
      </Flex>
      <Box dangerouslySetInnerHTML={{ __html: game?.detailed_description }} />
    </Box>
  );
};
