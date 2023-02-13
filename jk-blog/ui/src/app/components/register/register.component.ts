import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private FormBuilder:FormBuilder,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.registerForm = this.FormBuilder.group({
      name: [null, [Validators.required]],
      usernmae: [null, [Validators.required]],
      email: [null, [
        Validators.required,
        Validators.email,
        Validators.minLength(6)
      ]],
      password: [null, [
        Validators.required,
        Validators.minLength(3),
      //  CustomValidators.passwordContainsNumber
      ]],
      passwordConfirm: [null, [Validators.required]]
    }, {
   //   Validators: CustomValidators.passwordMatches
    })
 //   throw new Error('Method not implemented.');
  }

  onSubmit() {
    if(this.registerForm.invalid) {
      return;
    }
    console.log(this.registerForm.value);
    this.authService.register(this.registerForm.value).pipe(
      map(user => this.router.navigate(['login']))
    ).subscribe();
  }

}
