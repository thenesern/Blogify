import React from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core";
import { Button, TextField, Select, Input, MenuItem } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FileBase64 from "react-file-base64";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePost } from "../actions/post";

const useStyles = makeStyles((theme) => ({
  textField: {
    marginBottom: theme.spacing(2),
  },
  buttons: {
    marginTop: theme.spacing(2),
  },
}));

const tags = ["fun", "programming", "health", "science"];
const postSchema = yup.object().shape({
  title: yup.string().required(),
  subtitle: yup.string().required(),
  content: yup.string().min(20).required(),
  tag: yup.mixed().oneOf(tags),
});

const EditPostForm = ({ history, post, closeEditMode }) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(post?.image);
  const { register, handleSubmit, control, errors, reset } = useForm({
    resolver: yupResolver(postSchema),
  });
  const styles = useStyles();

  const onSubmit = (data) => {
    const updatedPost = { _id: post._id, ...data, image: file };
    dispatch(updatePost(post._id, updatedPost));
    reset();
    setFile(null);
    closeEditMode();
  };

  return (
    <div>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="title"
          label="Başlık"
          name="title"
          variant="outlined"
          className={styles.textField}
          size="small"
          error={errors.title ? true : false}
          inputRef={register}
          fullWidth
          defaultValue={post?.title}
        />
        <TextField
          id="subtitle"
          label="Alt Başlık"
          name="subtitle"
          variant="outlined"
          className={styles.textField}
          size="small"
          error={errors.subtitle ? true : false}
          inputRef={register}
          fullWidth
          defaultValue={post?.subtitle}
        />
        <Controller
          as={
            <Select input={<Input />} className={styles.textField} fullWidth>
              {tags.map((tag, index) => (
                <MenuItem key={index} value={tag}>
                  {tag}
                </MenuItem>
              ))}
            </Select>
          }
          name="tag"
          control={control}
          error={errors.tag ? true : false}
          defaultValue={post?.tag}
        />

        <TextField
          id="content"
          label="İçerik"
          name="content"
          multilinerows={4}
          variant="outlined"
          className={styles.textField}
          size="small"
          error={errors.content ? true : false}
          inputRef={register}
          fullWidth
          defaultValue={post?.content}
        />
        <FileBase64 multiple={false} onDone={({ base64 }) => setFile(base64)} />
        <div className={styles.buttons}>
          <Button color="secondary" variant="outlined" onClick={closeEditMode}>
            Discard
          </Button>
          <Button color="primary" variant="outlined" type="submit">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditPostForm;
