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
    if (user) return res.status(400).json({ msg: "Email already exist!" });

    if (!firstName || !lastName || !birthDate || !gender || !address || !email || !password || !confirmPass) {
      return res.status(400).json({ msg: "Incomplete Fields!" });
    }

    if (password !== confirmPass) return res.status(400).json({ msg: "Password does not match!" });

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
  });
});

module.exports = router;