const router = require('express').Router();
const {
  createUser,
  sendOTP,
  checkUser,
  validateOTP,
} = require('./user.controller');

// Default route
router.get('/', (req, res) => {
  res.send('Welcome to the Rsquare server !');
});

// Register a user
router.post('/createUser', (req, res) => {
  createUser(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) =>
      res.send({
        message: 'Error occured on the create user endpoint!',
        statusCode: 501,
        err,
      })
    );
});

router.post('/sendOTP', (req, res) => {
  sendOTP(req.body)
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});

router.post('/checkUser', (req, res) => {
  checkUser(req.body)
    .then((response) => res.send(response))
    .catch((err) => res.send(err));
});

router.post('/validateOTP', (req, res) => {
  validateOTP(req.body)
    .then((response) => res.send(response))
    .catch((err) => res.send({ err, message: 'Hello' }));
});

module.exports = router;
