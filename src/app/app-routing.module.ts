import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProductModule} from './product/product.module';
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {AuthModule} from "./auth/auth.module";


const routes: Routes = [
  {path: '', redirectTo: 'products', pathMatch: 'full'},
  // {path: 'detail', component: ProductDetailComponent}
  // {path: 'login', component: LoginComponent},
  // {path: 'register', component: RegisterComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ProductModule,
    AuthModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
