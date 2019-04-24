import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.scss';
import LandingPage from './components/LandingPage';
import CreateForm from './components/CreateForm';
import EditForm from './components/EditForm';

function App() {
  return (
    <div className="App">
      <Router>
      <div>
        <Route
          exact
          path="/"
          component={LandingPage}
        />
        <Route path="/create" component={CreateForm} />
        <Route path="/edit" component={EditForm} />
      </div>
    </Router>
    </div>
  );
}

export default App;
