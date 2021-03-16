import React, { useCallback, useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Button, Paper, TextField } from "@material-ui/core";
import { backendURL } from "../../Constants/backendConfig";
import {
  InteractionRequiredAuthError,
  SilentRequest,
} from "@azure/msal-browser";
import { loginRequest } from "../../Constants/authConfig";
import { useAccount, useIsAuthenticated, useMsal } from "@azure/msal-react";
import { CommentResponse } from "../ImageList/imageList";
import ImageBoxComment from "../ImageBoxComment/imageBoxComment";
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: 400,
      maxWidth: 400,
      margin: 25,
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
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
  creatorId: string;
  imageId: string;
  comments: CommentResponse[];
};

export default function ImageBox(props: ImageBoxProps) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [comments, setComments] = React.useState<CommentResponse[]>([]);
  const [currentComment, setCurrentComment] = React.useState("");
  const { instance, accounts } = useMsal();
  const account = useAccount(accounts[0] || {})!;

  const history = useHistory();
  const goToCreator = useCallback(() => history.push('/user/' + props.creatorId), [history]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  async function getAccessToken() {
    const silentRequest: SilentRequest = {
      account: account,
      ...loginRequest,
    };
    try {
      const resp = await instance.acquireTokenSilent(silentRequest);
      if (resp.accessToken) {
        return resp.accessToken;
      }
    } catch (error) {
      if (error instanceof InteractionRequiredAuthError) {
        // fallback to interaction when silent call fails
        instance.acquireTokenPopup(silentRequest).then((response) => {
          return response.accessToken;
        });
      }
    }
  }

  function addComment() {
    var newCommentArray: CommentResponse[] = comments!;
    var newComment: CommentResponse = {
      creatorName: account.name!,
      creatorUserId: account.homeAccountId,
      createdOn: Date(),
      commentContent: currentComment,
    };
    newCommentArray.push(newComment);
    //console.log(newCommentArray)
    setComments(newCommentArray);
    setCurrentComment("");
    sendComment(currentComment);
  }

  async function sendComment(comment: string) {
    const token = await getAccessToken();

    fetch(backendURL + "/image", {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        ImageId: props.imageId,
        CommentContent: comment,
      }),
    })
      .then((response) => response.json())
      .then((response) => { });
  }

  useEffect(() => {
    if (props.comments != null) {
      props.comments.map((comment, index) => {
        var newCommentArray: CommentResponse[] = comments!;
        newCommentArray.push(comment);
        setComments(newCommentArray);
        setCurrentComment("");
      });
    }
  }, []);

  var dateFormat = require("dateformat");


  return (
    <Card className={classes.root}>
      <CardHeader
        // avatar={
        //   <Avatar aria-label="recipe" className={classes.avatar}>
        //     {props.creator.charAt(0)}
        //   </Avatar>
        // }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={props.creator}
        subheader={dateFormat(Date.parse(props.createdOn))}
      />
      <CardMedia
        className={classes.media}
        image={props.src}
        title={props.imageId}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="user" onClick={goToCreator}>
          <PersonOutlineIcon />
        </IconButton>
        <IconButton aria-label="like">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <div>
            {comments.map((comment, index) => (
              <ImageBoxComment comment={comment} key={index}></ImageBoxComment>
            ))}
          </div>
          <TextField
            id="filled-full-width"
            label="Add Comment"
            style={{ margin: 8 }}
            placeholder=""
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) => {
              setCurrentComment(event.target.value);
            }}
          ></TextField>
          <Button variant="contained" component="label" onClick={addComment}>
            Add Comment
          </Button>
        </CardContent>
      </Collapse>
    </Card>
  );
}
