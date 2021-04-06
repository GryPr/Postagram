import React, { useCallback, useEffect, useContext } from "react";
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
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Button, TextField } from "@material-ui/core";
import { backendURL } from "../../Constants/backendConfig";
import { useAccount, useMsal } from "@azure/msal-react";
import { CommentResponse } from "../ImageList/imageList";
import ImageBoxComment from "../ImageBoxComment/imageBoxComment";
import { useHistory } from "react-router-dom";
import { AuthenticationContext, AuthenticationContextType } from "../AuthenticationProvider/authenticationProvider";
import { fetchComment } from "../../Services/ImageService";

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
  const { accounts } = useMsal();
  const account = useAccount(accounts[0] || {})!;
  const { getAccessToken } = useContext(AuthenticationContext) as AuthenticationContextType

  const history = useHistory();
  const goToCreator = useCallback(
    () => history.push("/user/" + props.creatorId),
    // eslint-disable-next-line
    [history]
  );

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // Posts a comment
  function addComment() {
    var newCommentArray: CommentResponse[] = comments!;
    var newComment: CommentResponse = {
      creatorName: account.name!,
      creatorUserId: account.homeAccountId,
      createdOn: Date(),
      commentContent: currentComment,
    };
    newCommentArray.push(newComment);
    setComments(newCommentArray);
    setCurrentComment("");
    sendComment(currentComment);
  }

  // Sends the comment posted to the backend for storage in the database
  async function sendComment(comment: string) {
    const token = await getAccessToken();
    fetchComment()
   .then((resp) => resp.json());
  }

  // Gets the comments in the image box
  useEffect(
    () => {
      if (props.comments != null) {
        // eslint-disable-next-line
        props.comments.map((comment, index) => {
          var newCommentArray: CommentResponse[] = comments!;
          newCommentArray.push(comment);
          setComments(newCommentArray);
          setCurrentComment("");
        });
      }
    },
    // eslint-disable-next-line
    []
  );

  var dateFormat = require("dateformat");

  return (
    <Card className={classes.root}>
      <CardHeader
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