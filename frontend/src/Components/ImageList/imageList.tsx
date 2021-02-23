import { useEffect, useState } from "react";
import { Button, TextField, Paper } from "@material-ui/core";
import ImageBox from "../ImageBox/imageBox";

interface ImageResponse {
  fileName: string;
  contentType: string;
  imageDescription: string;
  createdOn: string;
  creatorName: string;
  imageContent: string;
}

const defaultImages: ImageResponse[] = [];

export default function ImageList() {
  const [images, setImages]: [
    ImageResponse[],
    (images: ImageResponse[]) => void
  ] = useState(defaultImages);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://localhost:5001/public", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(""),
    })
      .then((response) => response.json())
      .then((response) => {
        setImages(response.data);
        setLoading(false);
      });
  });

  return (
    <Paper>
      {loading ? "Currently loading" : ""}
      {images.map((image, index) => {
        <div>{index}</div>;
      })}
    </Paper>
  );
}
