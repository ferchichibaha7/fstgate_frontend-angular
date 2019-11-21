import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/Auth/auth.service';
import { SignUpInfo } from '../Services/Auth/signup-info';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form: any = {};
  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  checked = false;
  indeterminate = false;
  labelPosition = '2';
  labelPosition2 = '1';
  disabled = false;
  group:number=0;
  role:number;
  constructor(private authService: AuthService,private router: Router) { }

  ngOnInit() {
  }
  onSubmit() {
    console.log(this.form);

    this.signupInfo = new SignUpInfo(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password,
       this.role,
      this.group);
      console.log(this.form.role);

      console.log(this.form);


    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        setTimeout(() => {
          this.router.navigate(['login']);
      }, 4000);  //5s
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
