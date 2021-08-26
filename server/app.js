require('dotenv').config();
const express = require('express');
const cors = require("cors");
const logger = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const morgan = require('morgan');

const indexRouter = require('./routes/index');
const signupRouter = require('./routes/signup');
const signinRouter = require('./routes/signin');

const app = express();
const PORT = process.env.PORT;

app.use(logger('dev'));

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(morgan('dev'));
app.use('/', indexRouter);
app.use('/signup', signupRouter);
app.use('/signin', signinRouter);


app.listen(PORT, ()=>{
    console.log('Server has been started on PORT ' + PORT);
});
