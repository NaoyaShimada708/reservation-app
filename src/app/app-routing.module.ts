import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProductModule} from './product/product.module';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";


const routes: Routes = [
  {path: '', redirectTo: 'products', pathMatch: 'full'},
  // {path: 'detail', component: ProductDetailComponent}
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ProductModule
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
