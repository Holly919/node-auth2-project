const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const router = require('express').Router();

const Users = require('../users/users-model');
const { isValid } = require('../users/users-service');


router.post('/register', (req, res) => {
  const credentials = req.body;

  if (isValid(credentials)) {
    const rounds = process.env.BCRYPT_ROUNDS || 8;

    const hash = bcrypt.hashSync(credentials.password, rounds);

    credentials.password = hash;

    Users.add(credentials)
      .then(user => {
        const token = generateToken(user);
        res.status(201).json({ data: user, token });
      })
      .catch(error => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message: "please provide username and password and the password shoud be alphanumeric",
    });
  }
});


router.post('/login', (req, res) => {
    console.log(req.body)
  const { username, password } = req.body;

  if (isValid(req.body)) {
    Users.findBy({ username: username })
      .then(([user]) => {
          console.log(user)
        // compare the password the hash stored in the database
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({
            message: "Welcome to our API",
            token
          });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      })
      .catch(error => {
          console.log(error)
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message: "please provide username and password and the password shoud be alphanumeric",
    });
  }
});

function generateToken(user) {
    console.log(user)
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.department
  };

  const options = {
    expiresIn: '2h'
  };

  //const secret = process.env.JWT_SECRET || "a secure secret";

  const token = jwt.sign(payload, secret, options);
  return token;
};

module.exports = router;
