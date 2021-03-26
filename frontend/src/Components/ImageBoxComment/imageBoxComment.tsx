import { Paper } from "@material-ui/core";
import { CommentResponse } from "../ImageList/imageList";

type ImageBoxCommentProps = {
    comment: CommentResponse;
};

// Component for each posted comment
export default function ImageBoxComment(props: ImageBoxCommentProps) {
    return (
        <Paper
            elevation={3}
            style={{
                padding: 8,
                margin: 16,
                fontSize: "0.7em",
                textAlign: "justify",
                wordWrap: "break-word",
            }}
            id="comment"
        >
            <div>
                <b>{props.comment.creatorName}</b>
            </div>
            <div>{props.comment.commentContent}</div>
        </Paper>
    );
}
