import { backendURL } from "../Constants/backendConfig";
const { sendComment } = require("../Components/ImageBox/imageBox");

export { fetchComment };
export { fetchMainPageImages };
export { fetchsentData };

const fetchMainPageImages = async () => {
  const response = await fetch(backendURL + "/public", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(""),
  });
  const jsonData = await response.json();
  return jsonData;
};

const fetchComment = async (token: string) => {
  const response = await fetch(backendURL + "/image", {
    method: "PATCH",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      ImageId: sendComment.props.imageId,
      CommentContent: sendComment.comment,
    }),
  });
  const resp = await response.json();
  return resp;
};

const fetchsentData = async (token: string, formData: FormData) => {
  await fetch(backendURL + "/image", {
    method: "POST",
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + token,
    },
    body: formData,
  });
};
