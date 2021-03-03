
import React from 'react';
import './Description-style.css'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useState } from 'react';

type Descriptionprop = {
    creator:string;
    description:string;
    createdOn: string; 
}

function Description (props: Descriptionprop ){
   
    const[clicked,setClicked] = React.useState(false);
    const[count,setCount]= useState(0);
    
        return(
            <div className="overflow">
                <IconButton id="like" onClick={() => ({setClicked: clicked ? false : true})} aria-label="heart">
            {clicked ? (<FavoriteIcon color ="secondary" fontSize="large"/>) : 
                        (<FavoriteBorderIcon color ="secondary" fontSize="large" />) }      
                    
                </IconButton>
               
               {/* { clicked ? setCount(count+1) : count} */}
               
            
               
                <p id= "inline"> <strong>{props.creator}
                </strong> </p>
                <p> {props.createdOn}</p>
               
               
        <p id= "inline" className="description"> {props.description}</p>
    
            </div>
        )
    }

export default Description
