const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
// const ObjectId = Schema.ObjectId;

// {}内のreiqired:trueはnot null,maxは、最大文字数の設定
const UserSchema = new Schema({
  // author: ObjectId,
  username: {
    type: String,
    required: true,
    max: [60, '最大60文字までです。']
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    max: [60, 'Eメールは最大60文字までです。']
  },
  password: {
    type: String,
    required: true,
    min: [6, 'パスワードは6文字以上で入力してください。'],
    max: [30, 'パスワードは最大60文字までです。']
  },
});

// hasSomePasswordという新たな関数をつくる
UserSchema.methods.hasSamePassword = function (inputPassword) {
  // thisは、foundUserを指す
  const user = this
  return bcrypt.compareSync(inputPassword, user.password)
}

// saveをしたら、保存される前にこの関数が実行されてから保存が完了する
UserSchema.pre('save', function (next) {
  const user = this

  // 一つのハッシュを作成するのにかかる時間の設定
  const saltRounds = 10

  bcrypt.genSalt(saltRounds, function (err, salt) {

    // user.passwordとsaltをくっつけてhashにする
    bcrypt.hash(user.password, salt, function (err, hash) {
      user.password = hash
      // next関数で処理を抜ける
      next()
    });
  });

})

module.exports = mongoose.model('user', UserSchema)
