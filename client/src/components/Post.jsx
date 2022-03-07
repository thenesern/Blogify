import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Chip,
  Button,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 374,
    posiiton: "relative",
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
    backGroundColor: "rgba(0,0,0,0.5)",
    backgroundBlendMode: "darken",
  },
  overlay: {
    position: "absolute",
    top: "20px",
    left: "20px",
    color: "white",
  },
  chip: {
    marginTop: theme.spacing(1),
  },
}));

const Post = ({ _id, title, subtitle, content, tag, image, createdAt }) => {
  const styles = useStyles();

  return (
    <Card className={styles.root}>
      <CardMedia className={styles.media} image={image} title="Paella dish" />
      <div className={styles.overlay}></div>
      <CardContent>
        <Typography variant="h6" component="p" gutterBottom>
          {title}
        </Typography>{" "}
        <Typography variant="overline" component="p" gutterBottom>
          {subtitle}
        </Typography>{" "}
        <Typography variant="body2" component="p">
          {content?.substring(0, 250) + "..."}
        </Typography>
        <Chip label={`# ${tag}`} variant="outlined" className={styles.chip} />
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          <Link to={`/posts/${_id}`}>More...</Link>
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
