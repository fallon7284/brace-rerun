import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './components/Home'
import FullBrewer from './components/FullBrewer'
import './App.css';




function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Home}/>
        <Route path="/:id" component={FullBrewer}/>
      </Router>
      
    </div>
  );
}

export default App;
