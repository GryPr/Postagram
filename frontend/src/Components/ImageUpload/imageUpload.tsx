import { Button, TextField, Paper } from "@material-ui/core";
import { useEffect, useState } from "react";
import "./imageUpload.css";
import { useHistory } from "react-router-dom";
import { useAccount, useIsAuthenticated, useMsal } from "@azure/msal-react";
import { loginRequest } from "../../Constants/authConfig";
import {
  InteractionRequiredAuthError,
  SilentRequest,
} from "@azure/msal-browser";

export default function ImageUpload() {
  const [file, setFile] = useState<File>();
  const [description, setDescription] = useState('');
  const { instance, accounts } = useMsal();
  const account = useAccount(accounts[0] || {})!;
  const history = useHistory();
  const isAuthenticated = useIsAuthenticated();


  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function checkAuth() {
    if (isAuthenticated === false) {
      history.push('/')
    }
  }

  async function getAccessToken() {
    const silentRequest: SilentRequest = {
      account: account,
      ...loginRequest,
    };
    try {
      const resp = await instance
        .acquireTokenSilent(silentRequest);
      if (resp.accessToken) {
        return resp.accessToken;
      }
    } catch (error) {
      if (error instanceof InteractionRequiredAuthError) {
        // fallback to interaction when silent call fails
        instance.acquireTokenPopup(silentRequest).then((response) => {
          return response.accessToken
        });
      }
    }
  }

  async function sendData() {
    const token = await getAccessToken();

    var formData = new FormData();

    formData.append("ImageDescription", description)
    formData.append("ImageContent", file!)

    fetch("https://localhost:5001/image", {
      method: "POST",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        'Authorization': 'Bearer ' + token,
      },
      body: formData,
    })
      .then((response) => {
        history.push('/')
      });
    // setTimeout(() => {
    // }, 1000);
  }

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
        onChange={(event) => { setDescription(event.target.value) }}
      />
      <Button variant="contained" component="label" onClick={sendData}>
        Submit
      </Button>
    </Paper>
  );
}
