var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config({path: './config.env'})
const cors = require('cors')

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_ATLAS_URL)
 .then(res => console.log('成功連接資料庫'))
 .catch(err => console.log('資料庫連接有誤',err.message))

const httpController = require('./controllers/http')
var indexRouter = require('./routes/index');
const postsRouter = require('./routes/posts')
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use(httpController.pageNotFound)

//攔截程式碼錯誤
app.use((err, req, res, next) => {
  res.status(500).json(
    {
      status: 'false',
      message: err.message
    }
  );
});
module.exports = app;
