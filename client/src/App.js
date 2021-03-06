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
  const handleClose = () => {
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
      marginTop: theme.spacing(2),
    },
  }));

  const styles = useStyles();
  return (
    <>
      <Router>
        <CssBaseline />
        <Container maxWidth="xl">
          <AppBar position="static" color="inherit" elevation={1}>
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
                <a
                  href="https://blogify-eneseren.herokuapp.com/"
                  style={{ textDecoration: "none", fontSize: "2rem" }}
                >
                  Blogify
                </a>
              </Typography>
              <Button
                color="primary"
                variant="outlined"
                startIcon={<PenIcon />}
                onClick={openHandler}
              >
                New Post
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
        <AddPostForm open={open} handleClose={handleClose} />
      </Router>
    </>
  );
};

export default App;
