const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');

const app = express();

// view engine
app.set('view engine', 'ejs');

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());


// database connection
mongoose.connect('mongodb://localhost:27017/smoothie', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then(result => console.log('Connected  to Database'))
  .catch(err => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes);


// cookies
app.get('/set-cookies', (req, res) => {

  // res.setHeader('Set-Cookie', 'newUser=true');
  res.cookie('newUser', false);
  res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });

  res.send('you got the cookies!');

});

app.get('/read-cookies', (req, res) => {

  const cookies = req.cookies;
  console.log(cookies.newUser);

  res.json(cookies);

});



// Listen to Port
const port = process.env.PORT || 3000;
app.listen(port,(err)=>{
  if(!err){
    console.log('Listening to port ',port);
  }
});