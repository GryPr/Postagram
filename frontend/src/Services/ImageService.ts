import { useState } from "react";
import { backendURL } from "../Constants/backendConfig";
import ImageList from "../Components/ImageList/imageList";
import { getAllJSDocTagsOfKind } from "typescript";
const{sendComment}=require("../Components/ImageBox/imageBox");
const{sendData}=require("../Components/ImageUpload/imageUpload");
export{fetchComment};
export{fetchMainPageImages};
export{fetchsentData};

const fetchMainPageImages= async()=>{
const response = await fetch(backendURL + "/public", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(""),
    })
const jsonData = await response.json();
return jsonData;


};

const fetchComment= async()=>{
  const response = await  fetch(backendURL + "/image", {
    method: "PATCH",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + sendComment.token,
    },
    body: JSON.stringify({
      ImageId: sendComment.props.imageId,
      CommentContent: sendComment.comment,
    }),
  })
  const resp = await response.json();
  return resp;
};

const fetchsentData = async()=>{
  const response= await  fetch(backendURL + "/image", {
    method: "POST",
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      'Authorization': 'Bearer ' + sendData.token,
    },
    body: sendData.formData,
  })
   
    };


