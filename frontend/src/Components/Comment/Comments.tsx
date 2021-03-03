
import React from 'react';
import './comment.css'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


// type commentprops={

// }

function Comments ( ) {
    
        return(
        <div className="box input">
            <TextField id="comment" label="Comment"/>
        {/* <button id="post"> Post</button> */}
        <Button id="post" variant="contained"> Post </Button>
        </div>
        )
    }
    

    export default Comments