require('dotenv').config();
const cors = require("cors");
const path = require('path');
const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(morgan('dev'));

const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log('Server has been started on PORT ' + PORT)
})
