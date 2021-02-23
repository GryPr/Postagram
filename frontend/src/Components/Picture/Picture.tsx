import {Component} from 'react';
import React from 'react';
import pic from './Picjpg.jpg'
import './Picture-style.css'

class Picture extends Component {

    render() {
        return (
            <div className="pic"> 

        <img src = {pic} className="pic" alt= "user" width="400" height="400"/> 
            <hr/>
            </div>
    
        )

     }


}

export default Picture