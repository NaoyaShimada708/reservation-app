// expressは、Nodeウェブフレームワーク。httpメソッドを扱うライブラリ
const express = require('express')
const router = express.Router()
const Product = require('../model/product')
const UserCtrl = require('../controllers/user')


router.get('/secret',UserCtrl.authMiddleware, function (req, res) {

    return res.json({"secret":true})

})


// エンドポイントが空でgetのとき、{}内を返す
router.get('', function (req, res) {
  // モデルを使って作成したデータをとってくるメソッド
  Product.find({}, function (err, foundProducts) {
    return res.json(foundProducts)
  })
})

router.get('/:productId', UserCtrl.authMiddleware, function (req, res) {
  const productId = req.params.productId
  Product.findById(productId, function (err, foundProduct) {
    if (err) {
      return res.status(422).send({errors: [{title: 'Product error', detail: 'Product not found!'}]})
    }
    return res.json(foundProduct)
  })
})

module.exports = router
