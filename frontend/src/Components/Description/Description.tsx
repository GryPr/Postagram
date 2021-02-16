import { Component } from "react";
import React from 'react';
import './Description-style.css'

import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';


class Description extends Component{
    render() {
        return(
            <div>
                <ThumbUpAltIcon />
                <ThumbDownAltIcon/>

                {/* <p className="like"> Like </p> */}
                <p id= "inline"> comment</p>
               <br/>
               
         
                <p id= "inline"> <strong>Name of person</strong> </p>
                <p id= "inline"> Description</p>
            </div>

        )

    }
}
export default Description
