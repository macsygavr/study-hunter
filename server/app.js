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
const PORT = process.env.PORT;

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

// // переменную загрузки
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 2000000 }, //ставим лимит на размер файла 2мб
//   fileFilter: function (req, file, callback) {
//     checkFileType(file, callback);
//   },
// }).single('image');

// //пишем функцию которая проверяет тип файла
// //Проверяем не только расширение, но и mimetype(например: 'application/json' или 'image/jpeg')
// function checkFileType(file, cb) {
//   // разрешенные расширения
//   const filetypes = /jpeg|jpg|png|gif/;
//   //проверка расширения
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

//   //проверка mimetype
//   const mimetype = filetypes.test(file.mimetype);

//   if (extname && mimetype) {
//     return cb(null, true);
//   } else {
//     cb('Ошибка: Загрузите пожалуйста изображения!');
//   }
// }

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

// app.post("/loadimage", multer(), (req, res) => {
//   console.log(req.body);
//   //   res.json({image: JSON.stringify(req.body.image)})
// });
app.post("/upload", function (req, res, next) {
  let filedata = req.file;
  console.log(filedata);
  // if (!filedata) res.send("Ошибка при загрузке файла");
  // else res.send("Файл загружен");
  res.json(filedata.path.slice(7))
});

app.listen(PORT, () => {
  console.log("Server has been started on PORT " + PORT);
});
