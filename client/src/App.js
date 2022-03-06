import { makeStyles } from "@material-ui/core/styles";

import {
  CssBaseline,
  Container,
  Grid,
  AppBar,
  Toolbar,
  Button,
  IconButton,
} from "@material-ui/core";
import { Typography } from "@material-ui/core";
import PenIcon from "@material-ui/icons/Create";
import { useState } from "react";
import AddPostForm from "./components/AddPostForm";

const App = () => {
  const [open, setOpen] = useState(false);
  const openHandler = () => {
    setOpen(true);
  };
  const closeHandler = () => {
    setOpen(false);
  };
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    container: {
      marginTop: theme.spacing(3),
    },
  }));

  const styles = useStyles();
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <AppBar position="static" color="inherit" elevation={0}>
          <Toolbar>
            <IconButton
              edge="start"
              className={styles.container}
              color="inherit"
            ></IconButton>
            <Typography variant="h6" color="secondary" className={styles.title}>
              <a href="http://localhost:3000/posts">Blogify</a>
            </Typography>
            <Button
              color="primary"
              variant="outlined"
              startIcon={<PenIcon />}
              onClick={openHandler}
            >
              Yeni Yazı
            </Button>
          </Toolbar>
        </AppBar>

        <Grid container className={styles.container}>
          <Grid item xs={12}></Grid>
        </Grid>
      </Container>
      <AddPostForm open={open} closeHandler={closeHandler} />
    </>
  );
};

export default App;
