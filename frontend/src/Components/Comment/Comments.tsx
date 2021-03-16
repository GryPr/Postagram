
import React, {useState} from 'react';
import './comment.css'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


// type commentprops={

// }

   function handleCommentSumbit(data:any) {
        const postData ={
            comment:data
        }
    };
    

function Comments (props:any) {
    const { handleCommentSumbit } = props;

    const [comment, setComment] = useState('');

  
        return(
        <div className="box input">
            <TextField id="comment" label="Add a new comment"  defaultValue = "Hello"
            onChange={event => setComment(event.target.value)} > </TextField>
        {/* <button id="post"> Post</button> */}
        <Button id="post" variant="contained" onClick={event => { handleCommentSumbit(comment);
             setComment('')}}> Post </Button>
        </div>
        )
    }
    

    export default Comments