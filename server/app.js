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
const usersPhotoRouter = require("./routes/userPhoto");

const app = express();
const PORT = process.env.SERVER_PORT;

/////MULTER/////
// //настройка движка хранения файла
const storage = multer.diskStorage({
  destination: './public/userPhotos',
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
  `${process.env.CLIENT_APP_URL}:${process.env.SERVER_PORT}`,
  `http://localhost:${process.env.CLIENT_APP_PORT}`,
  `http://127.0.0.1:${process.env.CLIENT_APP_PORT}`
];

app.use(cookieParser());
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || corsWhitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  allowedHeaders: 'Accept,Content-Type,Authorization',
  // находясь на каком ресурсе мы можем запрашивать и получать данные
  // и куки как их ресурсов мы можем принимать
  credentials: true,
}));
app.use(express.static(path.join(process.env.PWD, 'public')));
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
app.use("/upload", usersPhotoRouter);

app.listen(PORT, ()=> {
    console.log('Server has been started on PORT ' + PORT);
});
