import React, { Component } from 'react';
import './Header-style.css';

import Avatar from '@material-ui/core/Avatar';

class Header extends Component{




render(){
   
return (  
        <div> 
           <div className="contain">
             <div className="avatar">
           <Avatar src="./Avatar.jpg"/>
           </div>
             <p id="marginleft"> Name of person </p>
         
          </div>
          
        </div>
      )
  }
}
export default Header