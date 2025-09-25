import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Button
} from "@mui/material";

export default function Test() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title="React Course"
        subheader="September 25, 2025"
      />
      <CardMedia
        component="img"
        height="140"
        image="https://cdn.pixabay.com/photo/2016/01/19/15/48/luggage-1149289_1280.jpg"
        alt="React"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Learn React step by step with practical examples and hands-on projects.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
