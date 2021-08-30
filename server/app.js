require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const morgan = require("morgan");
const multer = require("multer");

const indexRouter = require("./routes/index");
const signupRouter = require("./routes/signup");
const signinRouter = require("./routes/signin");
const favoritesRouter = require("./routes/favorites");

const app = express();
const PORT = process.env.SERVER_PORT;

/////MULTER/////
// //настройка движка хранения файла
const storage = multer.diskStorage({
  destination: './public/goodphotos',
  filename: function (req, file, callback) {
    callback(
      null,
      file.originalname.toLowerCase()
    );
  },
});  

// cors whitelist - адреса, с которых можно получать данные с нашего сервера
const corsWhitelist = [
  `${process.env.CLIENT_APP_URL}:${process.env.CLIENT_APP_PORT}`,
  `http://localhost:${process.env.CLIENT_APP_PORT}`,
  `http://127.0.0.1:${process.env.CLIENT_APP_PORT}`
];

app.use(cookieParser());
app.use(cors({
  origin: function (origin, callback) {
    if (corsWhitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  // находясь на каком ресурсе мы можем запрашивать и получать данные
  // и куки как их ресурсов мы можем принимать
  credentials: true,
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  name: 'StudyHunter',
  cookie: { secure: false, httpOnly: true },
  store: new FileStore({}),
}));

app.use(morgan('dev'));
app.use(multer({ storage }).single("filedata"));
app.use('/', indexRouter);
app.use('/signup', signupRouter);
app.use('/signin', signinRouter);
app.use('/favorites', favoritesRouter);

app.post("/upload", function (req, res, next) {
  let filedata = req.file;
  console.log(filedata);
  res.json(filedata.path.slice(7))
});
  
app.listen(PORT, ()=> {
    console.log('Server has been started on PORT ' + PORT);
});
