const express = require('express');
const bcrypt = require('bcryptjs'); // Import bcrypt


const jwt = require('jsonwebtoken');



const app = express();

const port = 4000;



app.use(express.json());



const users = [];



// Secret key for JWT

const JWT_SECRET = 'your_jwt_secret_key';



// User registration route

app.post('/register', async (req, res) => {

  const { username, password } = req.body;

// Hash the password before storing it

const saltRounds = 10;

const hashedPassword = await bcrypt.hash(password, saltRounds);



  const newUser = { id: users.length + 1, username, password: hashedPassword };

  users.push(newUser);



  res.status(201).json({ message: 'User registered successfully!' });

});



// User login route

app.post('/login', async (req, res) => {

  const { username, password } = req.body;



  // Find the user by username

  const user = users.find((u) => u.username === username);

  if (!user)  {

    return res.status(400).json({ message: 'Invalid credentials' });

  }
 // Compare the provided password with the hashed password

 const isMatch = await bcrypt.compare(password, user.password);

 if (!isMatch) {

   return res.status(400).json({ message: 'Invalid credentials' });

 }


  // Generate a JWT token if the password matches

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });



  res.json({ token });

});
// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {

  const authHeader = req.headers['authorization'];

  const token = authHeader && authHeader.split(' ')[1];



  if (!token) {

    return res.status(401).json({ message: 'Access denied: No token provided' });

  }



  jwt.verify(token, JWT_SECRET, (err, user) => {

    if (err) {

      return res.status(403).json({ message: 'Invalid token' });

    }

    req.user = user;

    next();

  });

};



// Protected route example

app.get('/protected', authenticateToken, (req, res) => {

  res.json({ message: 'Access granted to protected resource', user: req.user });

});

// Start the server

app.listen(port, () => {

  console.log(`Server running on http://localhost:${port}`);

});

