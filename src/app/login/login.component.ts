import { TestService } from './../Services/Data/test.service';
import { TokenStorageService } from './../Services/Auth/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { AuthLoginInfo } from '../Services/Auth/login-info';
import { AuthService } from '../Services/Auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  name:string;
  userid:number;
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private test: TestService) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
      this.username = this.tokenStorage.getUsername();

  }}

  onSubmit() {
    console.log(this.form);

    this.loginInfo = new AuthLoginInfo(
      this.form.username,
      this.form.password);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();
        this.reloadPage();

      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;

      }
    );
  }

  reloadPage() {
    window.location.reload();
  }
  logout() {
    this.tokenStorage.signOut();
    window.location.reload();
  }



}
