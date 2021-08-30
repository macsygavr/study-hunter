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
const usersPhotoRouter = require("./routes/userPhoto")

const app = express();
const PORT = process.env.PORT;

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

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use(cookieParser());
app.use(
  session({
    secret: "shshsh",
    resave: false,
    saveUninitialized: false,
    name: "StudyHunter",
    cookie: { secure: false },
    store: new FileStore({}),
  })
);

app.use(morgan("dev"));
app.use(multer({ storage }).single("filedata"));
app.use("/", indexRouter);
app.use("/signup", signupRouter);
app.use("/signin", signinRouter);
app.use("/favorites", favoritesRouter);
app.use("/upload", usersPhotoRouter);


app.listen(PORT, () => {
  console.log("Server has been started on PORT " + PORT);
});
