
import './Header-style.css';
import Button from '@material-ui/core/Button';
import Box from '../Avatar-Box/Avatar-Box'
import React from 'react'
import {useState} from 'react'

type Headerprops = {

  creator : string;
}


function Header(props: Headerprops) {


   return (  
       
          <div className="contain">
            
              {/* <div className="avatar">
            <Box /> 
              </div>  */}
            {/* <Avatar className="avatar" src="./Avatar.jpg"/> */}
            
            {/* {this.props.person.map(user=>  (<p id="name"> {user.name} </p>))}   */}
            <p id="name">{props.creator}</p> 
            
            
                <Button id="follows"> Follow </Button>
            
           
           
           {/* <Button id="follows"> Follow  </Button>  */}
             
              
      
          </div>
            
      );
   }

export default Header