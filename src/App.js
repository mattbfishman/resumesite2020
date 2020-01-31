import React, {Component} from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Terminal from './Components/Terminal/Terminal';

class App extends Component {
    render(){
          return( 
              <div>
                  <Header/>
                  <Terminal/>
              </div>
          );
  }
}

export default App;
