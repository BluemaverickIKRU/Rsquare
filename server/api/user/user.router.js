const router = require('express').Router();

// Default route
router.get('/', (req, res) => {
  res.send('Welcome to the Rsquare server !');
});

// Register a user
router.post('/createUser', (req, res) => {
  console.log(req.body);
  res.send({ message: 'Successfull' });
});

module.exports = router;
