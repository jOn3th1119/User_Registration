import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
import axios from 'axios';
import moment from "moment";

export default class EditUser extends Component {
  state = {
    firstName: "",
    middleName: "",
    lastName: "",
    nameExt: "",
    birthDate: "",
    gender: "",
    address: "",
    msg: null,
    redirect: false
  };

  componentDidMount = () => {
    axios.get('/api/users/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          firstName: res.data.firstName,
          middleName: res.data.middleName,
          lastName: res.data.lastName,
          nameExt: res.data.nameExt,
          birthDate: moment(res.data.birthDate).format("YYYY-MM-DD"),
          gender: res.data.gender,
          address: res.data.address,
        });
      })
      .catch((err) => console.log("Error: " + err));
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  addUser = (e) => {
    e.preventDefault();

    axios.put('/api/users/' + this.props.match.params.id, this.state)
      .then((res) => { this.setState({ redirect: true }); })
      .catch(err => { this.setState({ msg: err.response.data.msg }); });
  };

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/' />;
    }

    return (
      <div className="container">
        <div className='mt-3'>
          <h3>Create New user</h3>
          <form className='mt-3 mb-3'>
            <div className="form-group mt-3">
              <label htmlFor="firstName">First Name:</label>
              <input className="form-control mt-2" autoComplete="off" type="text" name="firstName" id="firstName" onChange={this.onChange} value={this.state.firstName} />
            </div>

            <div className="form-group mt-3">
              <label htmlFor="middleName">Middle Name:</label>
              <input className="form-control mt-2" autoComplete="off" type="text" name="middleName" id="middleName" onChange={this.onChange} value={this.state.middleName} />
            </div>

            <div className="form-group mt-3">
              <label htmlFor="lastName">Last Name:</label>
              <input className="form-control mt-2" autoComplete="off" type="text" name="lastName" id="lastName" onChange={this.onChange} value={this.state.lastName} />
            </div>

            <div className="form-group mt-3">
              <label htmlFor="nameExt">Name Extension:</label>
              <input className="form-control mt-2" autoComplete="off" type="text" name="nameExt" id="nameExt" onChange={this.onChange} value={this.state.nameExt} />
            </div>

            <div className="form-group mt-3">
              <label htmlFor="birthDate">Birth Date:</label>
              <input className="form-control mt-2" autoComplete="off" type="date" name="birthDate" id="birthDate" onChange={this.onChange} value={this.state.birthDate} />
            </div>

            <div className="form-group mt-3">
              <label htmlFor="gender">Gender:</label>
              <select className="form-control mt-2" name="gender" id="gender" onChange={this.onChange} value={this.state.gender}>
                <option disabled value=""> -- Select Gender -- </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="form-group mt-3">
              <label htmlFor="address">Address:</label>
              <input className="form-control mt-2" autoComplete="off" type="text" name="address" id="address" onChange={this.onChange} value={this.state.address} />
            </div>

            {this.state.msg ? <span className='text-danger'>{this.state.msg}</span> : null}

            <div className="form-group mt-3">
              <button type="submit" className="btn btn-primary" onClick={this.addUser}>Save Todo</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
