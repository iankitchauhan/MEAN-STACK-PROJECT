import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient ) { }


  signupUser(postData){
    console.log(postData,'hhhhhhh');
    const authData: AuthData = {email: postData.value.email,password: postData.value.password}
return this.http.post('http://localhost:3000/api/user/signup', authData);
}

login(loginData) {
  const authData: AuthData = {email: loginData.value.email,password: loginData.value.password}
  return this.http.post('http://localhost:3000/api/user/login', authData);
}

}



