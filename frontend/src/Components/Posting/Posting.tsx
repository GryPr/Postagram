import React, { Component } from 'react';
import "./Posting-style.css"
import Comments from '../Comment/Comments'
import Description from '../Description/Description'
import Header from '../Header/Header';
import Picture  from '../Picture/Picture'



type postingprops={

creator: string;
description:string;
src: string;
createdOn: string

}

function Posting (props : postingprops) {
    return(
    <div className="container">
            <div className="header">
                <Header creator ={props.creator}/>
            </div>
        <Picture src={props.src}/>
        
            <div className="description">
                <Description
                creator = {props.creator}
                createdOn={props.createdOn}
                description= {props.description}/>
            </div>
        {/* <hr/> */}
        <Comments/>
    </div>
    )
}


export default Posting