import { Link, Route, Switch } from 'react-router-dom';

import CreateUser from './components/Users/CreateUser';
import EditUser from './components/Users/EditUser';
import React from 'react';
import UserList from './components/Users/UserList';

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
        <Route exact path="/" component={UserList} />
        <Route path="/edit/:id" component={EditUser} />
        <Route exact path="/create" component={CreateUser} />
      </Switch>
    </div>
  );
}

export default App;
