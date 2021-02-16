import {Component} from 'react';
import React from 'react';
import insta from './insta.jpg'
import './Picture-style.css'

class Picture extends Component {

    render() {
        return (
            <div className="pic"> 

        <img src = {insta} className="pic" alt= "your mom" width="400" height="450"/> 
            
            </div>
    
        )

     }


}

export default Picture