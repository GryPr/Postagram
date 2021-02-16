import React, { Component } from 'react';
import "./Posting-style.css"

import Comments from '../Comment/Comments'
import Description from '../Description/Description'
import Header from '../Header/Header';
import Picture from '../Picture/Picture'

class Posting extends Component{
render() {
    return(
    <div className="container">
    <div className="header">
    <Header> </Header>
    </div>
    <hr/>

    <Picture></Picture>
    <hr/>
    <div className="description">
    <Description></Description>
    </div>
    <hr/>
    <Comments></Comments>
       
     </div>
    )
}

}
export default Posting