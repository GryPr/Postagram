import React from "react";
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
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Button, Paper, TextField } from "@material-ui/core";

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
};

export default function ImageBox(props: ImageBoxProps) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [comments, setComments] = React.useState([''])
  const [currentComment, setCurrentComment] = React.useState('')

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function addComment() {
    var newCommentArray = comments!
    newCommentArray.push(currentComment)
    console.log(newCommentArray)
    setComments(newCommentArray)
    setCurrentComment('')
  }

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
        subheader={props.createdOn}
      />
      <CardMedia
        className={classes.media}
        image={props.src}
        title=""
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
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
              <Paper style={{ margin: 8, fontSize: '0.6em' }}
                key={index} id="comment">{comment}</Paper>
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
            onChange={(event) => { setCurrentComment(event.target.value) }}
          >
          </TextField>
          <Button variant="contained" component="label" onClick={addComment}>
            Add Comment
            </Button>
        </CardContent>
      </Collapse>
    </Card>
  );
}
