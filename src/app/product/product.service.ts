import {Injectable} from '@angular/core';
import {products} from "./product";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  getProducts(): Observable<any> {
    // return products
    return this.http.get('/api/v1/products')
  }

  getProductById(productId: string): Observable<any> {
    // return products[productId]
    // debugger
    return this.http.get('/api/v1/products/' + productId)
  }

  constructor(private http: HttpClient) {
  }
}
