import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.minLength(6)
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ])
    })
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    console.log("Hello world");
    this.authService.login(this.loginForm.value).pipe(
      map(token => this.router.navigate(['admin']))
    ).subscribe();
  }
  // login() {
  //   this.authService.login('tanoj.rout@gmail.com','asddp').subscribe(data => console.log('SUCCESS'));
  // }
}
