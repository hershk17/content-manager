import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { RouterLink } from '../../routes/components';

// ----------------------------------------------------------------------

export default function NotFoundView() {
  return (
    <Container>
      <Box
        sx={{
          py: 2,
          maxWidth: 480,
          mx: 'auto',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h3" sx={{ mb: 3 }}>
          Sorry, page not found!
        </Typography>

        <Typography sx={{ color: 'text.secondary' }}>
          Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be
          sure to check your spelling.
        </Typography>

        <Box
          component="img"
          src="/assets/illustrations/illustration_404.svg"
          sx={{
            mx: 'auto',
            height: 260,
            my: { xs: 5, sm: 10 },
          }}
        />

        <Button href="/" size="large" variant="contained" component={RouterLink}>
          Go to Home
        </Button>
      </Box>
    </Container>
  );
}
