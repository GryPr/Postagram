import React, { Component } from 'react';
import "./Posting-style.css"
import Comments from '../Comment/Comments'
import Description from '../Description/Description'
import Header from '../Header/Header';


import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";

import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";


import IconButton from "@material-ui/core/IconButton";

import { blue, red } from "@material-ui/core/colors";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: 400,
      maxWidth: 400,
      margin: 25,
     
     
    },
    media: {
      height: 130,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
    //   marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: red[500],
    },
  })
);
  
type ImageBoxProps = {
    src: string;
    description: string;
    createdOn: string;
    creator: string;
  };

  export default function ImageBox(props: ImageBoxProps) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
  
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
  
    return (
       
      <Card className={classes.root}>
           <div className= "border"> 
          <div className = "header">
            <Header creator ={props.creator}/>
          </div>
        <CardMedia
          className={classes.media}
          image={props.src}
          title=""
        />
            <div className="description"> 
          <Description
          creator={props.creator}
          description={props.description}
          createdOn = {props.createdOn}
          />
        </div>
      
        <Comments/>
         </div>
      </Card>
     
    );
  }


