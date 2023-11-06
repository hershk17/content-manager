import { faker } from "@faker-js/faker";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import Iconify from "../../../components/iconify";
import AppConversionRates from "../app-conversion-rates";
import AppCurrentSubject from "../app-current-subject";
import AppCurrentVisits from "../app-current-visits";
import AppNewsUpdate from "../app-news-update";
import AppOrderTimeline from "../app-order-timeline";
import AppTasks from "../app-tasks";
import AppTrafficBySite from "../app-traffic-by-site";
import AppWebsiteVisits from "../app-website-visits";
import AppWidgetSummary from "../app-widget-summary";

export default function AppView() {
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Stat 1"
            total={714000}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Stat 2"
            total={1352831}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Stat 3"
            total={1723315}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Stat 4"
            total={234}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Weekly Stats"
            subheader="(+43%) than last week"
            chart={{
              labels: [
                "01/01/2003",
                "02/01/2003",
                "03/01/2003",
                "04/01/2003",
                "05/01/2003",
                "06/01/2003",
                "07/01/2003",
                "08/01/2003",
                "09/01/2003",
                "10/01/2003",
                "11/01/2003",
              ],
              series: [
                {
                  name: "Series A",
                  type: "column",
                  fill: "solid",
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: "Series B",
                  type: "area",
                  fill: "gradient",
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: "Series C",
                  type: "line",
                  fill: "solid",
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Stat Distribution"
            chart={{
              series: [
                { label: "Stat 1", value: 4344 },
                { label: "Stat 2", value: 5435 },
                { label: "Stat 3", value: 1443 },
                { label: "Stat 4", value: 4443 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Sample Stats"
            subheader="(+43%) than last week"
            chart={{
              series: [
                { label: "Stat A", value: 400 },
                { label: "Stat B", value: 430 },
                { label: "Stat C", value: 448 },
                { label: "Stat D", value: 470 },
                { label: "Stat E", value: 540 },
                { label: "Stat F", value: 580 },
                { label: "Stat G", value: 690 },
                { label: "Stat H", value: 1100 },
                { label: "Stat I", value: 1200 },
                { label: "Stat J", value: 1380 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentSubject
            title="Current Stats"
            chart={{
              categories: ["Stat 1", "Stat 2", "Stat 3", "Stat 4", "Stat 5", "Stat 6"],
              series: [
                { name: "Series 1", data: [80, 50, 30, 40, 100, 20] },
                { name: "Series 2", data: [20, 30, 40, 80, 20, 80] },
                { name: "Series 3", data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppNewsUpdate
            title="Recent Updates"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: faker.lorem.words(),
              description: faker.lorem.sentence(),
              image: `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: faker.date.recent(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="Stats Timeline"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                "An example stat would go here",
                "Something happened on this date",
                "What could have occured here",
                "An interesting timeline event",
                "Burger with no honey mustard",
              ][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppTrafficBySite
            title="Traffic by Site"
            list={[
              {
                name: "Steam",
                value: 537,
                icon: <Iconify icon="mdi:steam" width={32} />,
              },
              {
                name: "Epic",
                value: 322,
                icon: <Iconify icon="simple-icons:epicgames" width={32} />,
              },
              {
                name: "GOG",
                value: 188,
                icon: <Iconify icon="mdi:gog" width={32} />,
              },
              {
                name: "Origin",
                value: 52,
                icon: <Iconify icon="mdi:origin" width={32} />,
              },
            ]}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="Todo"
            list={[
              { id: "1", name: "Farm experience in blighttown" },
              { id: "2", name: "Drink a healthy amount of water" },
              { id: "3", name: "Finish masters degree in quantum physics" },
              { id: "4", name: "Purchase a game and never play it" },
              { id: "5", name: "Become elden lord" },
            ]}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
