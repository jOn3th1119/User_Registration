import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
import axios from 'axios';

export default class CreateUser extends Component {
  state = {
    firstName: "",
    middleName: "",
    lastName: "",
    nameExt: "",
    birthDate: "",
    gender: "",
    address: "",
    email: "",
    password: "",
    confirmPass: "",
    msg: null,
    redirect: false
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  addUser = (e) => {
    e.preventDefault();

    axios.post('/api/users/', this.state)
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
          <form className="mt-3 mb-3">

            <div className="form-group row mt-3">
              <label className="col-sm-2 col-form-label" htmlFor="firstName">First Name:</label>
              <div className="col-sm-10">
                <input className="form-control" autoComplete="off" type="text" name="firstName" id="firstName" onChange={this.onChange} value={this.state.firstName} />
              </div>
            </div>

            <div className="form-group row mt-3">
              <label className="col-sm-2 col-form-label" htmlFor="middleName">Middle Name:</label>
              <div className="col-sm-10">
                <input className="form-control mt-2" autoComplete="off" type="text" name="middleName" id="middleName" onChange={this.onChange} value={this.state.middleName} />
              </div>
            </div>

            <div className="form-group row mt-3">
              <label className="col-sm-2 col-form-label" htmlFor="lastName">Last Name:</label>
              <div className="col-sm-10">
                <input className="form-control mt-2" autoComplete="off" type="text" name="lastName" id="lastName" onChange={this.onChange} value={this.state.lastName} />
              </div>
            </div>

            <div className="form-group row mt-3">
              <label className="col-sm-2 col-form-label" htmlFor="nameExt">Name Extension:</label>
              <div className="col-sm-10">
                <input className="form-control mt-2" autoComplete="off" type="text" name="nameExt" id="nameExt" onChange={this.onChange} value={this.state.nameExt} />
              </div>
            </div>

            <div className="form-group row mt-3">
              <label className="col-sm-2 col-form-label" htmlFor="birthDate">Birth Date:</label>
              <div className="col-sm-10">
                <input className="form-control mt-2" autoComplete="off" type="date" name="birthDate" id="birthDate" onChange={this.onChange} value={this.state.birthDate} />
              </div>
            </div>

            <div className="form-group row mt-3">
              <label className="col-sm-2 col-form-label" htmlFor="gender">Gender:</label>
              <div className="col-sm-10">
                <select className="form-control mt-2" name="gender" id="gender" onChange={this.onChange} defaultValue={this.state.gender}>
                  <option disabled value=""> -- Select Gender -- </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>

            <div className="form-group row mt-3">
              <label className="col-sm-2 col-form-label" htmlFor="address">Address:</label>
              <div className="col-sm-10">
                <input className="form-control mt-2" autoComplete="off" type="text" name="address" id="address" onChange={this.onChange} value={this.state.address} />
              </div>
            </div>

            <div className="form-group row mt-3">
              <label className="col-sm-2 col-form-label" htmlFor="email">Email Address:</label>
              <div className="col-sm-10">
                <input className="form-control mt-2" autoComplete="off" type="text" name="email" id="email" onChange={this.onChange} value={this.state.email} />
              </div>
            </div>

            <div className="form-group row mt-3">
              <label className="col-sm-2 col-form-label" htmlFor="password">Password:</label>
              <div className="col-sm-10">
                <input className="form-control mt-2" autoComplete="off" type="password" name="password" id="password" onChange={this.onChange} value={this.state.password} />
              </div>
            </div>

            <div className="form-group row mt-3">
              <label className="col-sm-2 col-form-label" htmlFor="confirmPass">Confirm Password:</label>
              <div className="col-sm-10">
                <input className="form-control mt-2" autoComplete="off" type="password" name="confirmPass" id="confirmPass" onChange={this.onChange} value={this.state.confirmPass} />
              </div>
            </div>

            {this.state.msg ? <span className='text-danger'>{this.state.msg}</span> : null}

            <div className="form-group mt-5 mx-auto" style={{ marginBottom: "200px", width: "150px" }}>
              <button type="submit" className="btn btn-primary btn-lg" onClick={this.addUser}>Save User</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
