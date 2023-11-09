import { Container, Grid } from "@mui/material";
import { Helmet } from "react-helmet-async";
import Footer from "../../components/Footer";
import PageTitleWrapper from "../../components/PageTitleWrapper";
import PageHeader from "./PageHeader";

import AccountBalance from "./AccountBalance";
import AccountSecurity from "./AccountSecurity";
import Wallets from "./Wallets";
import WatchList from "./WatchList";

function DashboardCrypto() {
  return (
    <>
      <Helmet>
        <title>Crypto Dashboard</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12}>
            <AccountBalance />
          </Grid>
          <Grid item lg={8} xs={12}>
            <Wallets />
          </Grid>
          <Grid item lg={4} xs={12}>
            <AccountSecurity />
          </Grid>
          <Grid item xs={12}>
            <WatchList />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default DashboardCrypto;
