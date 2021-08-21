import { Link, Route, Switch } from 'react-router-dom';

import React from 'react';

function App() {
  return (
    <div>
      <div className="navbar bg-light navbar-expand-lg navbar-light">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link className="nav-link" to="/">Users</Link>
          </li>
          <li className="navbar-item">
            <Link className="nav-link" to="/create">Add User</Link>
          </li>
        </ul>
      </div>
      <Switch>
      </Switch>
    </div>
  );
}

export default App;
