import { Component } from "react";
import React from 'react';
import './Description-style.css'


class Description extends Component{
    render() {
        return(
            <div>
                <p className="like"> Like </p>
                <p id= "inline"> comment</p>
               <br/>
                <p id= "inline"> <strong>Name of person</strong> </p>
                <p id= "inline"> Description</p>
            </div>

        )

    }
}
export default Description
