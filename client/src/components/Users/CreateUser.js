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
    errs: [],
    redirect: false,
    submitted: false
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  addUser = (e) => {
    e.preventDefault();

    this.setState({ submitted: true });

    axios.post('/api/users/', this.state)
      .then((res) => { this.setState({ redirect: false }); })
      .catch(err => { this.setState({ errs: err.response.data }); });
  };

  validate = (field) => {
    let err = this.state.errs.find(err => err.field === field);

    if (err) {
      return err.msg;
    } else {
      return false;
    }
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
          <form className="mt-3 mb-3 needs-validation">

            <div className="form-group row mt-3">
              <label className="col-sm-2 col-form-label" htmlFor="firstName">First Name:</label>
              <div className="col-sm-10">
                <input
                  className={"form-control" + (this.state.submitted ? (this.validate("firstName") ? " is-invalid" : " is-valid") : "")}
                  autoComplete="off"
                  type="text"
                  name="firstName"
                  id="firstName"
                  onChange={this.onChange}
                  value={this.state.firstName} />
                <div className="invalid-feedback">
                  {this.validate("firstName")}
                </div>
              </div>
            </div>

            <div className="form-group row mt-3">
              <label className="col-sm-2 col-form-label" htmlFor="middleName">Middle Name:</label>
              <div className="col-sm-10">
                <input
                  className="form-control mt-2"
                  autoComplete="off"
                  type="text"
                  name="middleName"
                  id="middleName"
                  onChange={this.onChange}
                  value={this.state.middleName} />
              </div>
            </div>

            <div className="form-group row mt-3">
              <label className="col-sm-2 col-form-label" htmlFor="lastName">Last Name:</label>
              <div className="col-sm-10">
                <input
                  className={"form-control" + (this.state.submitted ? (this.validate("lastName") ? " is-invalid" : " is-valid") : "")}
                  autoComplete="off"
                  type="text"
                  name="lastName"
                  id="lastName"
                  onChange={this.onChange}
                  value={this.state.lastName} />
                <div className="invalid-feedback">
                  {this.validate("lastName")}
                </div>
              </div>
            </div>

            <div className="form-group row mt-3">
              <label className="col-sm-2 col-form-label" htmlFor="nameExt">Name Extension:</label>
              <div className="col-sm-10">
                <input
                  className="form-control mt-2"
                  autoComplete="off"
                  type="text"
                  name="nameExt"
                  id="nameExt"
                  onChange={this.onChange}
                  value={this.state.nameExt} />
              </div>
            </div>

            <div className="form-group row mt-3">
              <label className="col-sm-2 col-form-label" htmlFor="birthDate">Birth Date:</label>
              <div className="col-sm-10">
                <input
                  className={"form-control" + (this.state.submitted ? (this.validate("birthDate") ? " is-invalid" : " is-valid") : "")}
                  autoComplete="off"
                  type="date"
                  name="birthDate"
                  id="birthDate"
                  onChange={this.onChange}
                  value={this.state.birthDate} />
                <div className="invalid-feedback">
                  {this.validate("birthDate")}
                </div>
              </div>
            </div>

            <div className="form-group row mt-3">
              <label className="col-sm-2 col-form-label" htmlFor="gender">Gender:</label>
              <div className="col-sm-10">
                <select
                  className={"form-control" + (this.state.submitted ? (this.validate("gender") ? " is-invalid" : " is-valid") : "")}
                  name="gender"
                  id="gender"
                  onChange={this.onChange}
                  defaultValue={this.state.gender}>
                  <option disabled value=""> -- Select Gender -- </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <div className="invalid-feedback">
                  {this.validate("gender")}
                </div>
              </div>
            </div>

            <div className="form-group row mt-3">
              <label className="col-sm-2 col-form-label" htmlFor="address">Address:</label>
              <div className="col-sm-10">
                <input
                  className={"form-control" + (this.state.submitted ? (this.validate("address") ? " is-invalid" : " is-valid") : "")}
                  autoComplete="off"
                  type="text"
                  name="address"
                  id="address"
                  onChange={this.onChange}
                  value={this.state.address} />
                <div className="invalid-feedback">
                  {this.validate("address")}
                </div>
              </div>
            </div>

            <div className="form-group row mt-3">
              <label className="col-sm-2 col-form-label" htmlFor="email">Email Address:</label>
              <div className="col-sm-10">
                <input
                  className={"form-control" + (this.state.submitted ? (this.validate("email") ? " is-invalid" : " is-valid") : "")}
                  autoComplete="off"
                  type="text"
                  name="email"
                  id="email"
                  onChange={this.onChange}
                  value={this.state.email} />
                <div className="invalid-feedback">
                  {this.validate("email")}
                </div>
              </div>
            </div>

            <div className="form-group row mt-3">
              <label className="col-sm-2 col-form-label" htmlFor="password">Password:</label>
              <div className="col-sm-10">
                <input
                  className={"form-control" + (this.state.submitted ? (this.validate("password") ? " is-invalid" : " is-valid") : "")}
                  autoComplete="off"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onChange}
                  value={this.state.password} />
                <div className="invalid-feedback">
                  {this.validate("password")}
                </div>
              </div>
            </div>

            <div className="form-group row mt-3">
              <label className="col-sm-2 col-form-label" htmlFor="confirmPass">Confirm Password:</label>
              <div className="col-sm-10">
                <input
                  className={"form-control" + (this.state.submitted ? (this.validate("confirmPass") ? " is-invalid" : " is-valid") : "")}
                  autoComplete="off"
                  type="password"
                  name="confirmPass"
                  id="confirmPass"
                  onChange={this.onChange}
                  value={this.state.confirmPass} />
                <div className="invalid-feedback">
                  {this.validate("confirmPass")}
                </div>
              </div>
            </div>

            <div className="form-group mt-5 mx-auto" style={{ marginBottom: "200px", width: "150px" }}>
              <button type="submit" className="btn btn-primary btn-lg" onClick={this.addUser}>Save User</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
