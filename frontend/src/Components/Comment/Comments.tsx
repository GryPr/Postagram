import React, { Component } from 'react'; 
import './comment.css'
import Button from '@material-ui/core/Button';

class Comments extends Component {
    render(){
        return(
        <div className="box">
        
        <input type="text" placeholder="Add comment" id="comment"></input>
        <button id="post"> Post</button>
        
        </div>
        )
    }
    }

    export default Comments