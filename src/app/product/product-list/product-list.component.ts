import {Component, OnInit} from '@angular/core';
import {products} from '../product';
import {ProductService} from "../product.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: any;

  // = [1, 2, 3, 4];

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {

    // this.products = this.productService.getProducts();

    const productsObservable = this.productService.getProducts();
    productsObservable.subscribe(
      // ハローファンクション形式
      (data) => {
        console.log('次のデータが出力されました。' + data)
        this.products = data;
      },
      (err) => {
        console.error('次のエラーが発生しました。' + err)
      },
      () => {
        console.log('完了しました。')
      }
    )

    // *********************練習用******************************
    // const observable = new Observable(subscriber => {
    //   subscriber.next(1);
    //   subscriber.next(2);
    //   subscriber.next(3);
    //   // subscriber.complete()
    //   // subscriber.error('エラー発生!')
    //   setTimeout(() => {
    //     subscriber.next(4);
    //     subscriber.complete();
    //   }, 3000);
    // });
    //
    // console.log('subscribe前');
    // observable.subscribe({
    //   関数をオブジェクトの中に入れて使う形式
    //   next(x) { console.log('got value ' + x); },
    //   error(err) { console.error('something wrong occurred: ' + err); },
    //   complete() { console.log('done'); }
    // });
    // console.log('subscribeから抜けました');
    // ************************************************************
  }

}
