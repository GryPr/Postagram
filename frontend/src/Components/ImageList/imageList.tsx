import React, { useEffect, useState } from "react";
import ImageBox from "../ImageBox/imageBox";
import { backendURL } from "../../Constants/backendConfig";
import Grid from "@material-ui/core/Grid";
import { Box } from "@material-ui/core";

interface ImageResponse {
  fileName: string;
  contentType: string;
  imageDescription: string;
  imageId: string;
  createdOn: string;
  creatorName: string;
  creatorId: string;
  imageContent: string;
  comments: CommentResponse[];
}

export interface CommentResponse {
  creatorUserId: string;
  creatorName: string;
  createdOn: string;
  commentContent: string;
}

const defaultImages: ImageResponse[] = [];

export default function ImageList() {
  const [images, setImages]: [
    ImageResponse[],
    (images: ImageResponse[]) => void
  ] = useState(defaultImages);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(backendURL + "/public", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(""),
    })
      .then((response) => response.json())
      .then((response) => {
        setImages(response);
        setLoading(false);
      });
  }, []);

  return (
    <Box width="75%">
      <Grid container justify="flex-start" alignItems="flex-start" direction="row">
        {loading ? "Currently loading" : ""}
        {images.map((image, index) => (
          <Grid item key={index} >
            <ImageBox
              src={`data:${image.contentType};base64,${image.imageContent}`}
              description={image.imageDescription}
              createdOn={image.createdOn}
              creator={image.creatorName}
              creatorId={image.creatorId}
              imageId={image.imageId}
              comments={image.comments}
            />
            {/* <img id="img" src={`data:${image.contentType};base64,${image.imageContent}`} alt="" /> */}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
