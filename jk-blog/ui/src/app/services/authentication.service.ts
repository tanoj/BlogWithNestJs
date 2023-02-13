import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


export interface LoginForm {
  email: string;
  password: string;
};

export interface User{
  name?: string;
  username?: string;
  email?: string;
  passwordConfirm?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(loginForm: LoginForm) {
    return this.http.post<any>('/api/users/login', { email: loginForm.email, password: loginForm.password }).pipe(
      map((token) => {
        console.log(token);
        localStorage.setItem('jk-blog-token', token.access_token);
        return token;
      })
    )

  }
  register(user: any) {
    return this.http.post<any>('/api/users/',user).pipe(
      map(user => user)
    )

  }
}
