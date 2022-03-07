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
import { useState, useEffect } from "react";
import AddPostForm from "./components/AddPostForm";
import { useDispatch } from "react-redux";
import { getPosts } from "./actions/post";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PostsList from "./components/PostsList";
import PostDetails from "./components/PostDetails";

const App = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

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
      <Router>
        <CssBaseline />
        <Container maxWidth="lg">
          <AppBar position="static" color="inherit" elevation={0}>
            <Toolbar>
              <IconButton
                edge="start"
                className={styles.container}
                color="inherit"
              ></IconButton>
              <Typography
                variant="h6"
                color="secondary"
                className={styles.title}
              >
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
            <Grid item xs={12}>
              <Routes>
                <Route exact path="/posts" element={<PostsList />} />
                <Route exact path="/posts/:id" element={<PostDetails />} />
                <Route
                  path="/"
                  element={
                    <Navigate replace to="/posts" element={<PostsList />} />
                  }
                />
              </Routes>
            </Grid>
          </Grid>
        </Container>
        <AddPostForm open={open} closeHandler={closeHandler} />
      </Router>
    </>
  );
};

export default App;
