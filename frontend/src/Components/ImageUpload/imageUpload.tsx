import { Button, TextField, Paper } from "@material-ui/core";
import { useState } from "react";
import "./imageUpload.css";

export default function ImageUpload() {
  const [file, setFile] = useState<File>();
  return (
    <Paper id="bg" elevation={3}>
      <div>
        {file != null ? (
          <img id="img" src={URL.createObjectURL(file)} alt="" />
        ) : (
          "No Image Uploaded"
        )}
      </div>
      <Button variant="contained" component="label">
        Select Image
        <input
          type="file"
          alt=""
          onChange={(e) => setFile(e.target.files![0])}
          hidden
        />
      </Button>
      <TextField
        id="filled-full-width"
        label="Image Description"
        style={{ margin: 8 }}
        placeholder=""
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        variant="filled"
      />
      <Button variant="contained" component="label">
        Submit
      </Button>
    </Paper>
  );
}
