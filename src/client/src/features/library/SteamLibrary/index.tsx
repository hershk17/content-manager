import { faker } from "@faker-js/faker";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Container,
  Divider,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import Label from "../../../components/Label";
import PageTitleWrapper from "../../../components/PageTitleWrapper";
import Game from "../../../models/Game";
import { RootState } from "../../../stores/store";

const getStatusLabel = (): JSX.Element => {
  const map = [
    {
      text: "Completed",
      color: "success",
    },
    {
      text: "In Progress",
      color: "warning",
    },
    {
      text: "Dropped",
      color: "error",
    },
    {
      text: "Backlog",
      color: "secondary",
    },
  ];

  const { text, color }: any = map[faker.number.int(2)];

  return <Label color={color}>{text}</Label>;
};

const applyPagination = (
  steamGames: Game[] | undefined,
  page: number,
  limit: number
): Game[] => {
  if (!steamGames) return [];
  return steamGames.slice(page * limit, page * limit + limit);
};

const SteamLibrary = () => {
  const theme = useTheme();
  const user = useSelector((state: RootState) => state.auth.user);

  const API_URL = import.meta.env.VITE_SERVER_URL;
  const [steamGames, setSteamGames] = useState<Game[] | undefined>(undefined);

  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  const paginatedSteamGames = applyPagination(steamGames, page, limit);

  const handleSteamLink = () => {
    window.location.href = `${API_URL}/auth/steam`;
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  useEffect(() => {
    const fetchSteamGames = async () => {
      if (!user || !user?.steamId) return;
      const response = await axios.get(`${API_URL}/library/steam`, {
        withCredentials: true,
      });
      if (response.data.game_count > 0) {
        setSteamGames(response.data.games);
      }
    };

    fetchSteamGames();
  }, []);

  const renderContent = () => {
    if (!user?.steamId) {
      return (
        <button type="button" onClick={handleSteamLink}>
          Connect Steam
        </button>
      );
    }

    if (!steamGames) {
      return <p>Loading...</p>;
    }

    if (steamGames.length === 0) {
      return <p>No games found in Steam library.</p>;
    }

    return (
      <>
        <Divider />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Game</TableCell>
                <TableCell>Total Playtime</TableCell>
                <TableCell>Last Played</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedSteamGames.map((game) => {
                return (
                  <TableRow hover key={game.appid}>
                    <TableCell>
                      <Grid container>
                        <Grid item pr={1}>
                          <img
                            src={`https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/header.jpg`}
                            height={80}
                            alt={`${game.name} icon`}
                          />
                        </Grid>
                        <Grid item pt={0.5}>
                          <Typography
                            variant="body1"
                            fontWeight="bold"
                            color="text.primary"
                            gutterBottom
                            noWrap
                          >
                            {game.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            noWrap
                          >
                            ID: {game.appid}
                          </Typography>
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {Math.round(game.playtime_forever / 60)} hours
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {game.rtime_last_played
                          ? new Date(
                              game.rtime_last_played * 1000
                            ).toDateString()
                          : "Not Played"}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">{getStatusLabel()}</TableCell>
                    <TableCell align="right">
                      <Tooltip title="Edit Order" arrow>
                        <IconButton
                          sx={{
                            "&:hover": {
                              background: theme.colors.primary.lighter,
                            },
                            color: theme.palette.primary.main,
                          }}
                          color="inherit"
                          size="small"
                        >
                          <EditTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Order" arrow>
                        <IconButton
                          sx={{
                            "&:hover": {
                              background: theme.colors.error.lighter,
                            },
                            color: theme.palette.error.main,
                          }}
                          color="inherit"
                          size="small"
                        >
                          <DeleteTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box p={2}>
          <TablePagination
            component="div"
            count={steamGames.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25, 30]}
          />
        </Box>
      </>
    );
  };

  return (
    <>
      <Helmet>
        <title>Steam Library</title>
      </Helmet>
      <PageTitleWrapper>
        <Grid container alignItems="center">
          <Grid item>
            <Avatar
              sx={{
                mr: 2,
                width: theme.spacing(8),
                height: theme.spacing(8),
              }}
              variant="rounded"
              alt={user?.name}
              src={user?.avatar}
            />
          </Grid>
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Welcome, {user?.name}!
            </Typography>
            <Typography variant="subtitle2">
              Your current username is {user?.username}
            </Typography>
          </Grid>
        </Grid>
      </PageTitleWrapper>

      <Container maxWidth="lg">
        <Card>
          <CardHeader title="Your Steam Library" />
          <Box pt={2}>{renderContent()}</Box>
        </Card>
      </Container>
    </>
  );
};

export default SteamLibrary;
