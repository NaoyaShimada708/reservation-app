import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
// import {AuthComponent} from "./auth.component";
import {RouterModule, Routes} from "@angular/router";
import {ProductComponent} from "../product/product.component";
import {ProductListComponent} from "../product/product-list/product-list.component";
import {ProductDetailComponent} from "../product/product-detail/product-detail.component";
import {AuthService} from "./auth.service";
import {FormsModule} from "@angular/forms";
import {AuthGuard} from "./auth.guard";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {TokenInterceptor} from "./token.interceptor";


const routes: Routes = [
  // {
  //   path: 'auth', component: AuthComponent,
  //   children: [
  //     {path: 'login', component: LoginComponent},
  //     {path: 'register', component: RegisterComponent},
  //   ]
  // }
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},

];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    // AuthComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AuthGuard
  ]
})
export class AuthModule {
}
