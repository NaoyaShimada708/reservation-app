import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errors: any = []

  constructor(private authService: AuthService,private router:Router) {
  }

  ngOnInit(): void {

  }

  register(registerForm) {
    this.errors = []
    this.authService.register(registerForm.value).subscribe(
      (result) => {
        console.log(result)
        this.router.navigate(['/login'])
      },
      (err: HttpErrorResponse) => {
        console.log(err)
        this.errors = err.error.errors
      }
    )
    console.log(registerForm.value)
  }
}
