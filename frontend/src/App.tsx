
import React ,{ Component } from 'react';

import Posting from './Components/Posting/Posting'


class App extends Component {
  
  render() {
  return (
    <div>
    
     <Posting
     creator={"hello"}
     description={"bonjour"}
     createdOn={"15-09-20"} 
     src={"hello"}    
     />
    
    
    </div>
  );
}
}

export default App;
