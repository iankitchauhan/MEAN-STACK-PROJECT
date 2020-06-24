import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading= false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
  
  }

  onLoginForm(loginData){
    this.authService.login(loginData).subscribe(res => {
      console.log(res,'logged in SuccessFully');
    })
  }

}
