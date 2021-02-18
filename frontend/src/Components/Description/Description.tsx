import { Component } from "react";
import React from 'react';
import './Description-style.css'

import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';

import IconButton from '@material-ui/core/IconButton';

class Description extends Component{
    render() {
        return(
            <div>
                <IconButton aria-label="ThumbUp">
                <ThumbUpAltIcon  color ="primary" fontSize="large"/>
                </IconButton>
                <IconButton aria-label="ThumbDown">
                <ThumbDownAltIcon color="primary" fontSize="large"/>
                </IconButton>

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
