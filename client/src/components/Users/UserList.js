import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from "moment";

export default class UserList extends Component {
  state = {
    users: []
  };

  componentDidMount = () => {
    axios.get('/api/users/')
      .then(res => { this.setState({ users: res.data }); })
      .catch((err) => console.log("Error: " + err));
  };

  deleteUser = (e, id) => {
    e.preventDefault();
    axios.delete('/api/users/' + id)
      .catch((err) => console.log("Error: " + err));

    axios.get('/api/users/')
      .then(res => { this.setState({ users: res.data }); })
      .catch((err) => console.log("Error: " + err));
  };

  render() {
    return (
      <div className="container">
        <div className="mt-3">
          <h3>User List</h3>
          <table className="table table-striped mt-3">
            <thead>
              <tr>
                <th>Name</th>
                <th>Birth Date</th>
                <th>Gender</th>
                <th>Address</th>
                <th>Email Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.users ? this.state.users.map(user => {
                  return (
                    <tr key={user._id}>
                      <td>{user.lastName}, {user.firstName} {user.middleName}{user.nameExt === "" ? null : ", " + user.nameExt}</td>
                      <td>{moment(user.birthDate).format('LL')}</td>
                      <td>{user.gender}</td>
                      <td>{user.address}</td>
                      <td>{user.email}</td>
                      <td>
                        <Link to={`/edit/${user._id}`}>
                          Edit
                        </Link>
                        <button type="button" className="mx-3" onClick={(e) => { this.deleteUser(e, user._id); }}>Delete</button>
                      </td>
                    </tr>
                  );
                }) : null
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
