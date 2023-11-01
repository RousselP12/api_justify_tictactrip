const express = require('express')
const jwt = require('jsonwebtoken');

const router = express.Router();

const TestEmail = require('../text.json')

const secretKey = 'signature'; 

router.post('/', (req, res) => {
    const { email } = req.body;
  
    if (!email || email != TestEmail.email) {
      return res.status(400).json({ error: 'Mauvais email' });
    }
  
    const token = jwt.sign({ email }, secretKey , { expiresIn: '24h' });

    res.status(200).json({ token });
  });

module.exports = router;