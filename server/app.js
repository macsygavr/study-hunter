require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const morgan = require("morgan");

const indexRouter = require('./routes/index');
const signupRouter = require('./routes/signup');
const signinRouter = require('./routes/signin');
const favoritesRouter = require('./routes/favorites');

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use(cookieParser());
app.use(session({
  secret: 'shshsh',
  resave: false,
  saveUninitialized: false,
  name: 'StudyHunter',
  cookie: { secure: false },
  store: new FileStore({}),
}));

app.use(morgan('dev'));
app.use('/', indexRouter);
app.use('/signup', signupRouter);
app.use('/signin', signinRouter);
app.use('/favorites', favoritesRouter);
app.post("/loadimage", (req, res) => {
  console.log(req.body);
  //   res.json({image: JSON.stringify(req.body.image)})
});

app.listen(PORT, ()=>{
    console.log('Server has been started on PORT ' + PORT);
});
