import React, { Component } from 'react'; 
import './comment.css'


class Comments extends Component {
    render(){
        return(
        <div className="box input">
        
        <input type="text" placeholder="Add comment" id="comment"></input>
        <button id="post"> Post</button>
        
        </div>
        )
    }
    }

    export default Comments