import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

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
              <select className="form-control mt-2" name="gender" id="gender" onChange={this.onChange} defaultValue={this.state.gender}>
                <option disabled value=""> -- Select Gender -- </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="form-group mt-3">
              <label htmlFor="address">Address:</label>
              <input className="form-control mt-2" autoComplete="off" type="text" name="address" id="address" onChange={this.onChange} value={this.state.address} />
            </div>

            <div className="form-group mt-3">
              <label htmlFor="email">Email Address:</label>
              <input className="form-control mt-2" autoComplete="off" type="text" name="email" id="email" onChange={this.onChange} value={this.state.email} />
            </div>

            <div className="form-group mt-3">
              <label htmlFor="password">Password:</label>
              <input className="form-control mt-2" autoComplete="off" type="password" name="password" id="password" onChange={this.onChange} value={this.state.password} />
            </div>

            <div className="form-group mt-3">
              <label htmlFor="confirmPass">Confirm Password:</label>
              <input className="form-control mt-2" autoComplete="off" type="password" name="confirmPass" id="confirmPass" onChange={this.onChange} value={this.state.confirmPass} />
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
