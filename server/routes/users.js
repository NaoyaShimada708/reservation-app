// expressは、Nodeウェブフレームワーク。httpメソッドを扱うライブラリ
const express = require('express')
const router = express.Router()
const User = require('../model/user')
const config = require('../config/dev')
const jwt = require('jsonwebtoken')

router.post('/login', function (req, res) {
  const {email, password} = req.body

  if (!email) {
    return res.status(422).send({errors: [{title: 'User error', detail: 'Please fill email!'}]})
  }
  if (!password) {
    return res.status(422).send({errors: [{title: 'User error', detail: 'Please fill password!'}]})
  }

  User.findOne({email}, function (err, foundUser) {
    if (err) {
      return res.status(422).send({errors: [{title: 'User error', detail: 'Something went wrong!'}]})
    }
    if (!foundUser) {
      return res.status(422).send({errors: [{title: 'User error', detail: 'User don\'t exist!'}]})
    }
    if (!foundUser.hasSamePassword(password)) {
      return res.status(422).send({errors: [{title: 'User error', detail: 'Incorrect password'}]})
    }

    const token = jwt.sign({
      userId: foundUser.id,
      username: foundUser.username
    }, config.SECRET, {expiresIn: '1h'});

    return res.json(token)
  })
})

router.post('/register', function (req, res) {
    // req.body後の名前と代入先の変数の名前が同じなら、一行で記述できる。
    // const {username, email, password, confirmpassword} = req.body

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;

    if (!username) {
      // Invalid err
      return res.status(422).send({errors: [{title: 'User error', detail: 'Please fill username!'}]})
    }
    if (!email) {
      return res.status(422).send({errors: [{title: 'User error', detail: 'Please fill email!'}]})
    }
    if (!password) {
      return res.status(422).send({errors: [{title: 'User error', detail: 'Please fill password!'}]})
    }
    if (password !== confirmpassword) {
      return res.status(422).send({errors: [{title: 'User error', detail: 'Please check password!'}]})
    }

    // 該当するデータが一つ見つかった時点で終了
    User.findOne({email}, function (err, foundUser) {
      if (err) {
        return res.status(422).send({errors: [{title: 'User error', detail: 'Something went wrong!'}]})
      }
      if (foundUser) {
        return res.status(422).send({errors: [{title: 'User error', detail: 'User already exist!'}]})
      }

      const user = new User({username, email, password})
      user.save(function (err) {
        if (err) {
          return res.status(422).send({errors: [{title: 'User error', detail: 'Something went wrong!'}]})
        }
        return res.json({"register": true})
      })
    })

  }
)

module.exports = router
