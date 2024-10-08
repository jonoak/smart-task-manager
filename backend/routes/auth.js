const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
router.post('/register', async (req, res) => {
 const { username, password } = req.body;
 const hashedPassword = await bcrypt.hash(password, 10);
 const user = new User({ username, password: hashedPassword });
 await user.save();
 res.status(201).send('User registered');
});
router.post('/login', async (req, res) => {
 const { username, password } = req.body;
 const user = await User.findOne({ username });
 if (!user || !(await bcrypt.compare(password, user.password))) {
   return res.status(400).send('Invalid credentials');
 }
 const token = jwt.sign({ userId: user._id }, 'secretkey');
 res.json({ token });
});
module.exports = router;