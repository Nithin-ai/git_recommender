import { BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import React from 'react';
import Home from './home.js';


const App=()=>{
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Home}/>
        </Switch>
      </div>
    </Router>
  )
}

export default App;
