import { Box, Button, Flex, Stack, Title } from "@mantine/core";
import { useDocumentTitle } from "@mantine/hooks";
import { IconBrandSteam } from "@tabler/icons-react";

import { useValidateQuery } from "@/features/auth/authApi";
import { GameCard } from "@/features/library/GameCard";
import { useSteamLibraryQuery } from "@/features/library/libraryApi";
import { useCallback, useEffect, useState } from "react";

import { Embla } from "@mantine/carousel";

export const SteamLibrary = () => {
  useDocumentTitle("Library | Nexus");

  const API_URL = import.meta.env.VITE_SERVER_URL;
  const handleSteamLink = () => {
    window.location.href = `${API_URL}/auth/steam`;
  };

  const [scrollProgress, setScrollProgress] = useState(0);
  const [embla, setEmbla] = useState<Embla | null>(null);

  const handleScroll = useCallback(() => {
    if (!embla) return;
    const progress = Math.max(0, Math.min(1, embla.scrollProgress()));
    setScrollProgress(progress * 100);
  }, [embla, setScrollProgress]);

  useEffect(() => {
    if (embla) {
      embla.on("scroll", handleScroll);
      handleScroll();
    }
  }, [embla]);

  const { data: user } = useValidateQuery();

  if (!user?.steamId) {
    return (
      <Button
        variant="outline"
        leftSection={<IconBrandSteam />}
        onClick={handleSteamLink}>
        Connect Steam
      </Button>
    );
  }

  const { data: steamGames, isLoading: isLoadingGames } =
    useSteamLibraryQuery();

  if (isLoadingGames) {
    return <Box>Fetching...</Box>;
  }

  if (steamGames?.game_count === 0) {
    return <Box>No games found in Steam library.</Box>;
  }

  const gameCount = 5;

  const getRecentlyPlayedGames = () => {
    if (!steamGames?.games) {
      return [];
    }

    return steamGames?.games
      .slice()
      .sort((a, b) => b.rtime_last_played - a.rtime_last_played)
      .slice(0, gameCount);
  };

  const getMostPlayedgames = () => {
    if (!steamGames?.games) {
      return [];
    }

    return steamGames?.games
      .slice()
      .sort((a, b) => b.playtime_forever - a.playtime_forever)
      .slice(0, gameCount);
  };

  const getAlphabeticalGames = () => {
    if (!steamGames?.games) {
      return [];
    }

    return steamGames?.games
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(0, gameCount);
  };

  return (
    <Stack my="lg" mx="auto" px="lg" maw={1600}>
      <Title order={1}>Recently Played</Title>
      <Flex gap="md">
        {getRecentlyPlayedGames().map((game) => (
          <GameCard key={game.appid} game={game} />
        ))}
      </Flex>

      <Title order={1}>Most Played</Title>
      <Flex gap="md">
        {getMostPlayedgames().map((game) => (
          <GameCard key={game.appid} game={game} />
        ))}
      </Flex>

      <Title order={1}>All Games</Title>
      <Flex gap="md">
        {getAlphabeticalGames().map((game) => (
          <GameCard key={game.appid} game={game} />
        ))}
      </Flex>
    </Stack>
  );
};
