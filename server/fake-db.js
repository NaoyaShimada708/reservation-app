const Product = require('./model/product')

class FakeDb {
  constructor() {
    this.products = [
      {
        coverImage: '.\\assets\\img\\original.jpg',
        name: 'Phone XL',
        price: 799,
        description: 'A large phone with one of the best screens',
        heading1: 'サンプルテキスト1',
        heading2: 'サンプルテキスト2',
        heading3: 'サンプルテキスト3',
        headingtext1: 'サンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキスト',
        headingtext2: 'テキスト文書テキスト文書テキスト文書テキスト文書テキスト文書テキスト文書テキスト文書テキスト文書テキスト文書',
        headingtext3: 'duiddiwniwencewnnoncanccneincienci cwoecnwocn ejcowec weocwoc -cwnc we wecmwepmpcm'
      },
      {
        coverImage: '.\\assets\\img\\original.jpg',
        name: 'Phone Mini',
        price: 699,
        description: 'A great phone with one of the best cameras',
        heading1: 'サンプルテキスト1',
        heading2: 'サンプルテキスト2',
        heading3: 'サンプルテキスト3',
        headingtext1: 'サンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキスト',
        headingtext2: 'テキスト文書テキスト文書テキスト文書テキスト文書テキスト文書テキスト文書テキスト文書テキスト文書テキスト文書',
        headingtext3: 'duiddiwniwencewnnoncanccneincienci cwoecnwocn ejcowec weocwoc -cwnc we wecmwepmpcm'
      },
      {
        coverImage: '.\\assets\\img\\original.jpg',
        name: 'Phone Standard',
        price: 299,
        description: '',
        heading1: 'サンプルテキスト1',
        heading2: 'サンプルテキスト2',
        heading3: 'サンプルテキスト3',
        headingtext1: 'サンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキスト',
        headingtext2: 'テキスト文書テキスト文書テキスト文書テキスト文書テキスト文書テキスト文書テキスト文書テキスト文書テキスト文書',
        headingtext3: 'duiddiwniwencewnnoncanccneincienci cwoecnwocn ejcowec weocwoc -cwnc we wecmwepmpcm'
      },
      {
        coverImage: '.\\assets\\img\\original.jpg',
        name: 'Phone Special',
        price: 999,
        description: '',
        heading1: 'サンプルテキスト1',
        heading2: 'サンプルテキスト2',
        heading3: 'サンプルテキスト3',
        headingtext1: 'サンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキスト',
        headingtext2: 'テキスト文書テキスト文書テキスト文書テキスト文書テキスト文書テキスト文書テキスト文書テキスト文書テキスト文書',
        headingtext3: 'duiddiwniwencewnnoncanccneincienci cwoecnwocn ejcowec weocwoc -cwnc we wecmwepmpcm'
      }
    ]
  }

  async initDb() {
    await this.clearDb()
    this.pushProductsToDb()
  }

  async clearDb() {
    // この処理が終了してから次の処理を走らせる
    await Product.deleteMany({})
  }

  pushProductsToDb() {
    // forEachは、配列の各要素に対して引数にとっているコールバック関数を実行するメソッド
    this.products.forEach(
      (product) => {
        const newProduct = new Product(product)
        newProduct.save()
      }
    )
  }

  seeDb() {
    this.pushProductsToDb()
  }

}

module.exports = FakeDb
