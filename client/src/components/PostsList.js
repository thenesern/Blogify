import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { Grid, Button } from "@material-ui/core";
import Post from "./Post";

const useStyles = makeStyles((theme) => ({
  layoutShifter: {
    float: "right",
    margin: theme.spacing(2),
  },
}));

const PostsList = () => {
  const posts = useSelector((state) => state.posts.posts);
  /*  const [layout, setLayout] = useStyles("gridThree");
  const calculateMd = () => {
    return layout === "gridThree" ? 4 : 3;
  }; */
  const styles = useStyles();
  return (
    <>
      {/*     <div className={styles.layoutShifter}>
        <Button
          variant="text"
          size="small"
          onClick={() => setLayout("gridThree")}
        >
          <img
            src={""}
            alt=""
            style={{ background: layout === "gridThree" ? "#ccc" : "" }}
          />
        </Button>
      </div> */}
      <Grid container spacing={2} alignContent="stretch">
        {posts.length > 0 &&
          posts.map((post) => (
            <Grid item key={post?._id} xs={12} md={4}>
              <Post {...post} />
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default PostsList;
