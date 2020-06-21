// expressは、Nodeウェブフレームワーク。httpメソッドを扱うライブラリ
const express = require('express')
// mongooseは、mongodbに簡単にアクセスするためのフレームワーク
const mongoose = require('mongoose')
// 大事な情報が入っているのでgitignoreに設定
const config = require('./config/index')
const FakeDb = require('./fake-db')

const productRoutes = require('./routes/products')
const path = require('path')

mongoose.connect(config.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(
  () => {
    if (process.env.NODE_ENV !== 'production') {
      const fakeDb = new FakeDb()
      // fakeDb.initDb()
    }
  }
)

const app = express()

app.use('/api/v1/products', productRoutes)

if (process.env.NODE_ENV === 'production') {
  const appPath = path.join(__dirname, '..', 'dist', 'reservation-app')
  app.use(express.static(appPath))
  app.get("#", function (req, res) {
    res.sendFile(path.resolve(appPath, 'index.html'))
  })
}

// serverディレクトリの一個上の階層のdistをappPathとする
// /api/v1/products以外のパスが来たらindex.htmlを返す
// getでエンドポイントが/prductsのリクエストが来たら{}内を返す。functionは、コールバック関数。
// app.get('/products', function (req, res) {
//   res.json({'success': true})
// })

// ポート番号は、環境に依存するため(使うツールによる)3001以外のポートにも対応するため
const PORT = process.env.PORT || '3001'

app.listen(PORT, function () {
  console.log('I am run!')
})

// mongodb+srv://test:<password>@cluster0-lhjrz.mongodb.net/<dbname>?retryWrites=true&w=majority
