const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const MongoClient = require('mongodb').MongoClient;
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const cors = require('cors');
const history = require('connect-history-api-fallback')
require('dotenv').config()


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(history())
app.use(express.static('dist'))
let db;


MongoClient.connect(process.env.MOOGO, function (error, client) {
  if (error) return console.log(error);
  db = client.db('freeboard')
  app.listen(process.env.PORT, function () {
    console.log(`${process.env.PORT}`)
  })
})

app.post('/sign', function (req, res) {
  let user_password = req.body.user_pw;
  let user_id = req.body.user_id
  let user_name = req.body.user_name
  db.collection('members').findOne({ id: user_id }, function (err, result) {
    if (!result) {
      bcrypt.hash(user_password, 10, (err, encryptedPassowrd) => {
        db.collection('members').insertOne({ id: user_id, pw: encryptedPassowrd, name: user_name, token: '' })
          .then(() => {
            res.status(200).json({
              user: user_id,
              message: 'Register Success'
            })
          })
          .catch((error) => {
            console.log(error)
          })
      })
    } if (result) {
      res.status(200).json({ message: '이미 있는 ID입니다' })
    }
  })
})

app.post('/login', function (req, res) {
  let user_id = req.body.user_id
  let user_password = req.body.user_pw;
  db.collection('members').findOne({ id: user_id }, function (error, result) {
    if(result == null){
      res.status(200).json({message:"계정정보를 다시 확인하세요"})
    }else{
      const vaildPassword = bcrypt.compareSync(user_password, result.pw)
    if (!vaildPassword) {
      res.status(200).json({message:"계정정보를 다시 확인하세요"})
    } else {
      const token = jwt.sign({
        id: result.id
      }, process.env.HASH_TEXT, {
        expiresIn: "15m"
      })
      db.collection('members').updateOne({ id: result.id }, { "$set": { 'token': token } }, function (err, result) {
        if (err) return console.log(err)
      })
      res.status(200).json({ token: token, user_id: user_id,message:'' })
    }
    }
  })
})

function getCurrentDate() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth();
  var today = date.getDate();
  return new Date(Date.UTC(year, month, today));
}

app.get('/post', function (req, res) {
  const user = String(req.query.Data)
  const date = String(getCurrentDate())
  db.collection('posts').find({ user_id: user, date: date }).toArray(function (err, result) {
    res.status(200).json(result)
  })
})

app.post('/post', function (req, res) {
  const date = String(getCurrentDate())
  db.collection('posts').insertOne({ 'post': req.body.post_content, 'post_time': req.body.post_time, 'user_id': req.body.user_id, 'date': date })
  res.status(200).json({
    post: req.body.post_content,
    message: 'Add post'
  })
})

app.delete('/post', function (req, res) {
  const delPost = req.body.post;
  const delTime = req.body.post_time;
  const delId = req.body.user_id;
  db.collection('posts').deleteOne({ user_id: delId, post: delPost, post_time: delTime })
  res.status(200).json({ message: 'Delete Sucess' })
})

