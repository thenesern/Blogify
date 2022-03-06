import React from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core";
import {
  Button,
  TextField,
  Select,
  Input,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FileBase64 from "react-file-base64";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../actions/post";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
}));

const tags = ["fun", "programming", "health", "science"];
const postSchema = yup.object().shape({
  title: yup.string().required(),
  subtitle: yup.string().required(),
  content: yup.string().min(20).required(),
  tag: yup.mixed().oneOf(tags),
});

const AddPostForm = ({ open, closeHandler }) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const { register, handleSubmit, control, errors, reset } = useForm({
    resolver: yupResolver(postSchema),
  });
  const styles = useStyles();

  const onSubmit = (data) => {
    dispatch(createPost({ ...data, image: file }));
    clearForm();
  };

  const clearForm = () => {
    reset();
    setFile(null);
    closeHandler();
  };
  return (
    <Dialog open={open} onClose={closeHandler}>
      <DialogTitle>Yeni Yazı Oluştur</DialogTitle>
      <DialogContent>
        <DialogContentText>Yeni Yazı Formu</DialogContentText>
        <div className={styles.root}>
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
            />
            <Controller
              as={
                <Select
                  input={<Input />}
                  className={styles.textField}
                  fullWidth
                >
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
              defaultValue={tags[0]}
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
            />
            <FileBase64
              multiple={false}
              onDone={({ base64 }) => setFile(base64)}
            />
          </form>
        </div>
      </DialogContent>
      <DialogActions>
        <Button color="inherit" onClick={clearForm}>
          Vazgeç
        </Button>
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          onClick={() => handleSubmit(onSubmit)()}
        >
          Gönder
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPostForm;
