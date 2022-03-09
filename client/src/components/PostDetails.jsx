import React from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Paper, Divider, Button, Chip } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useEffect, useState } from "react";
import { getPostDetails, deletePost } from "../actions/post";
import { useParams } from "react-router-dom";
import EditPostForm from "./EditPostForm";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(8),
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
  content: {
    marginTop: theme.spacing(3),
  },
  image: {
    width: "50%",
    borderRadius: 5,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(4),
  },
  chip: {
    marginTop: theme.spacing(1),
  },
}));

const PostDetails = ({ match, history, location }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentPost = useSelector((state) => state.posts.currentPost);
  const [editMode, setEditMode] = useState(false);

  const openEditMode = () => {
    setEditMode(true);
  };
  const closeEditMode = () => {
    setEditMode(false);
  };

  useEffect(() => {
    dispatch(getPostDetails(id));
  }, [dispatch, id]);
  const styles = useStyles();

  const removePost = () => {
    dispatch(deletePost(currentPost._id));
    history.push("/posts");
  };
  const convertRelativeTime = (date) => {
    return moment(date).fromNow();
  };
  return (
    <Paper className={styles.paper} elevation={0}>
      {editMode ? (
        <EditPostForm post={currentPost} closeEditMode={closeEditMode} />
      ) : (
        <div>
          <div>
            <div className={styles.header}>
              <Typography variant="h5" gutterBottom>
                {currentPost?.title}
              </Typography>
              <div>
                <Button
                  onClick={openEditMode}
                  color="primary"
                  variant="outlined"
                  startIcon={<EditIcon />}
                >
                  Edit
                </Button>
                <Button
                  onClick={removePost}
                  color="secondary"
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  style={{ marginLeft: "1rem" }}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
          <Divider />
          <Typography variant="overline" gutterBottom>
            {currentPost?.subtitle}
          </Typography>
          <Typography variant="caption" component="p">
            {convertRelativeTime(currentPost?.createdAt)}
          </Typography>
          <Chip label={`# ${currentPost?.tag}`} style={{ marginTop: "1rem" }} />
          <div className={styles.content}>
            <img src={currentPost?.image} alt="" className={styles.image}></img>
            <Typography variant="body1">{currentPost?.content}</Typography>
          </div>
        </div>
      )}
    </Paper>
  );
};

export default PostDetails;
