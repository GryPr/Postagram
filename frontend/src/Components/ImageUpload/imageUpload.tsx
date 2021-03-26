import { Button, TextField, Paper, LinearProgress } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import "./imageUpload.css";
import { useHistory } from "react-router-dom";
import { useIsAuthenticated } from "@azure/msal-react";
import { backendURL } from "../../Constants/backendConfig";
import { AuthenticationContext, AuthenticationContextType } from "../AuthenticationProvider/authenticationProvider";

export default function ImageUpload() {
  const [file, setFile] = useState<File>();
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const isAuthenticated = useIsAuthenticated();
  const { getAccessToken } = useContext(AuthenticationContext) as AuthenticationContextType


  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function checkAuth() {
    if (isAuthenticated === false) {
      history.push('/')
    }
  }

  async function sendData() {
    setLoading(true);

    const token = await getAccessToken();

    var formData = new FormData();

    formData.append("ImageDescription", description)
    formData.append("ImageContent", file!)

    fetch(backendURL + "/image", {
      method: "POST",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        'Authorization': 'Bearer ' + token,
      },
      body: formData,
    })
      .then(() => {
        history.push('/')
      });
  }

  return (
    <Paper id="bg" elevation={3}>
      <div>
        {file != null ? (
          <img id="img" src={URL.createObjectURL(file)} alt="" />
        ) : (
          ""
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
        onChange={(event) => { setDescription(event.target.value) }}
      />
      <Button variant="contained" component="label" id="loading" onClick={sendData} >
        Submit
      </Button>
      {loading ? (<LinearProgress />) : (<div />)}
    </Paper>
  );
}
