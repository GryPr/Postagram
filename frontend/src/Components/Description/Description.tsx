import { Component } from "react";
import React from 'react';
import './Description-style.css'


import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';


class Description extends React.Component<any, any>{

        constructor(props:any){

            super(props);
            this.state= {
                clicked: false,
                count : 0
            }
        }

    render() {
        return(
            <div>
                <IconButton onClick={() => this.setState({clicked : true})} aria-label="heart">
            {this.state.clicked ? <FavoriteIcon color ="primary" fontSize="large"/> : 
                                <FavoriteBorderIcon color ="primary" fontSize="large" /> }      
                  {/* {this.setState({clicked : false})} */}
                </IconButton>

               {this.state.clicked ? this.state.count + 1 : this.state.count}
               <br/>
               
                <p id= "inline"> <strong>Name of person</strong> </p>
                <p id= "inline"> Description</p>
            
            </div>

        )
       

    }
}
export default Description
