import { Button, Container, Typography } from '@mui/material';

export default function Home() {
  return (
    <Container maxWidth="md">
      <Typography variant="h3" gutterBottom>
        MemoNest
      </Typography>
      <Button variant="contained" color="primary">
        Dodaj wydarzenie
      </Button>
    </Container>
  );
}
