import * as React from 'react';
import { HashRouter as Router, Route } from "react-router-dom";

import './App.css';

import Navbar from './components/Navbar';
import Homepage from './components/Home/Homepage';
import CousinContainer from './components/Cousin/CousinContainer';

class App extends React.Component {
    render() {         
      return (
        <div className="App">
          <header className="App-header">
            <Navbar />
          </header>
          <section>
            <Router>
              <Route exact={true} path='/' component={Homepage} />
              <Route exact={true} path='/index.html' component={Homepage} />
              <Route path='/cousin' component={CousinContainer} />
            </Router>
          </section>
        </div>  
      );
  }
}

export default App;
