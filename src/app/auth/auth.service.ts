import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {JwtHelperService} from "@auth0/angular-jwt";
import * as moment from 'moment'
import {Router} from "@angular/router";


const jwt = new JwtHelperService()

class DecodedToken {
  userId: string = ''
  username: string = ''
  exp: number = 0
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private decodedtoken

  constructor(private http: HttpClient, private router: Router) {
    // 例えば、ログインせずに各ページに行く場合は、右側の処理になる。ヘッダーは、未ログインの状態になる
    this.decodedtoken = JSON.parse(localStorage.getItem('app-meta')) || new DecodedToken()
    // console.log(this.decodedtoken) ログインしている場合は、オブジェクト型で取得(パースされる)
  }

  getToken() {
    return localStorage.getItem('app-auth')
  }

  isAuthenticated() {
    // 現在時刻が、有効期限より前かどうか
    return moment().isBefore(moment.unix(this.decodedtoken.exp))
  }

  register(userData: any): Observable<any> {
    return this.http.post('/api/v1/users/register', userData)
  }

  login(userData: any): Observable<any> {
    return this.http.post('/api/v1/users/login', userData).pipe(map(
      (token: string) => {
        this.decodedtoken = jwt.decodeToken(token)
        localStorage.setItem('app-auth', token)
        localStorage.setItem('app-meta', JSON.stringify(this.decodedtoken))
        return token
      }
    ))
  }

  logout() {
    localStorage.removeItem('app-auth')
    localStorage.removeItem('app-meta')
    this.decodedtoken = new DecodedToken()
    this.router.navigate(['/login'])
  }
}
