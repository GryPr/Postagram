import { Button, TextField, Paper } from "@material-ui/core";
import "./imageBox.css";

type ImageBox = {
  file: File;
};

export default function ImageBox(props: ImageBox) {
  return (
    <Paper id="bg" elevation={3}>
      <div>
        {props.file != null ? (
          <img id="img" src={URL.createObjectURL(props.file)} alt="" />
        ) : (
          "Failed to load image"
        )}
      </div>
    </Paper>
  );
}
