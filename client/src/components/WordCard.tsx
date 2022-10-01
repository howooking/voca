import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

type wordType = {
  _id: string;
  eng: string;
  kor: string;
  isDone: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export default function WordCard(word: wordType) {
  return (
    <Card sx={{ width: 250, margin: 2, height: 180 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {word.eng}
        </Typography>
        <Typography color="text.secondary">{word.kor}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="outlined">
          암기완료
        </Button>
      </CardActions>
    </Card>
  );
}
