import React, { Component } from 'react';
import './Header-style.css';

import Button from '@material-ui/core/Button';

import Box from '../Avatar-Box/Avatar-Box'



class Header extends Component{

  

 render(){
   return (  
       
          <div className="contain">
            
              <div className="avatar">
            <Box /> 
              </div> 
            {/* <Avatar className="avatar" src="./Avatar.jpg"/> */}
            
           <p id="name">Name of Person</p>     
            
              <Button id="follows"> 
                Follow 
             </Button>  
      
          </div>
            
      )
   }
}
export default Header