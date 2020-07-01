import {NgModule} from '@angular/core';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {ProductListComponent} from './product-list/product-list.component';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ProductComponent} from './product.component';
import {ProductService} from "./product.service";
import {AuthGuard} from "../auth/auth.guard";


const routes: Routes = [
  {
    path: 'products', component: ProductComponent,
    children: [
      {path: '', component: ProductListComponent},
      // {path: 'detail', component: ProductDetailComponent}
      {path: ':productId', component: ProductDetailComponent, canActivate: [AuthGuard]}
    ]
  }
];

@NgModule({
  declarations: [
    ProductComponent,
    ProductDetailComponent,
    ProductListComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  providers: [
    ProductService,
  ]
})
export class ProductModule {
}
