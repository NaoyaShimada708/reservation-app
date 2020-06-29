import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errors: any = []

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  login(loginForm) {
    console.log(loginForm.value)
    this.authService.login(loginForm.value).subscribe(
      (token) => {
        console.log(token)
        this.router.navigate(['/products'])
      },
      (err: HttpErrorResponse) => {
        console.error(err)
        this.errors = err.error.errors
      }
    )
  }
}


