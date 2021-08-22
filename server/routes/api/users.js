const express = require("express");

const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const config = require("config");

router.get('/', (req, res) => {
  User.find()
    .then(user => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.delete("/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(user => { res.json(user); })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post('/', (req, res) => {
  const { firstName, middleName, lastName, nameExt, birthDate, gender, address, email, password, confirmPass } = req.body;

  User.findOne({ email }).then(user => {
    let errs = [];
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!firstName) errs.push({ field: "firstName", msg: "First Name is Required!" });
    if (!lastName) errs.push({ field: "lastName", msg: "Last Name is Required!" });
    if (!birthDate) errs.push({ field: "birthDate", msg: "Birth Date is Required!" });
    if (!gender) errs.push({ field: "gender", msg: "Gender is Required!" });
    if (!address) errs.push({ field: "address", msg: "Address is Required!" });
    if (user) errs.push({ field: "email", msg: "Email already exist!" });
    if (!email) errs.push({ field: "email", msg: "Email Address is Required!" });
    if (!re.test(email)) errs.push({ field: "email", msg: "Email Address is Invalid!" });
    if (!password) errs.push({ field: "password", msg: "Password is Required!" });
    if (!confirmPass) errs.push({ field: "confirmPass", msg: "Confirm Password is Required!" });
    if (password !== confirmPass) errs.push({ field: "confirmPass", msg: "Password does not match!" });

    if (errs.length >= 1) {
      res.status(400).json(errs);
    } else {
      const newUser = new User({
        firstName,
        middleName,
        lastName,
        nameExt,
        birthDate,
        gender,
        address,
        email,
        password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch((err) => res.status(500).json("Error: " + err));
        });
      });
    }
  });
});

router.put('/:id', (req, res) => {
  const { firstName, middleName, lastName, nameExt, birthDate, gender, address } = req.body;

  User.findById(req.params.id)
    .then(user => {
      let errs = [];

      if (!firstName) errs.push({ field: "firstName", msg: "First Name is Required!" });
      if (!lastName) errs.push({ field: "lastName", msg: "Last Name is Required!" });
      if (!birthDate) errs.push({ field: "birthDate", msg: "Birth Date is Required!" });
      if (!gender) errs.push({ field: "gender", msg: "Gender is Required!" });
      if (!address) errs.push({ field: "address", msg: "Address is Required!" });

      if (errs.length >= 1) {
        res.status(400).json(errs);
      } else {
        user.firstName = firstName;
        user.middleName = middleName;
        user.lastName = lastName;
        user.nameExt = nameExt;
        user.birthDate = birthDate;
        user.gender = gender;
        user.address = address;

        user.save()
          .then(editedUser => res.json(editedUser))
          .catch((err) => res.status(500).json("Error: " + err));
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;