import React from 'react';
import pic from './Picjpg.jpg'
import './Picture-style.css'


type Pictureprop = {

        src:string;

}

function Picture (props : Pictureprop) {
        return(
        <div className="pic"> 
            
            {<img src= {props.src} alt="user"/>}
             <hr/>
        </div>
        )
}
export default Picture

// class Picture extends Component {

//     render() {
//         return (
//             <div className="pic"> 

//         <img src = {pic} className="pic" alt= "user" width="400" height="400"/> 
//             <hr/>
//             </div>
    
//         )

//      }


// }

// export default Picture