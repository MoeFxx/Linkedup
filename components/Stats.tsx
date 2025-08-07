import { Grid, Paper, Typography } from '@mui/material';

interface Props {
  review: number;
  ready: number;
  posted: number;
}

export default function Stats({ review, ready, posted }: Props) {
  const items = [
    { label: 'Review', value: review },
    { label: 'Ready', value: ready },
    { label: 'Posted', value: posted },
  ];
  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      {items.map((item) => (
        <Grid item xs={4} key={item.label}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">{item.value}</Typography>
            <Typography variant="caption">{item.label}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
