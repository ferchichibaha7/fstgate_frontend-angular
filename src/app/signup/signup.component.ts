import { TokenStorageService } from './../Services/Auth/token-storage.service';
import { Group } from './../Models/group';
import { TestService } from './../Services/Data/test.service';
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
  group = 0;
  role:number;
 groups:Group[];
  constructor(private authService: AuthService, private router: Router , private testService: TestService,private storage:TokenStorageService) { }

  ngOnInit() {
this.testService.getGroups().subscribe(data=>{
this.groups=data;


if(this.storage.isUserLoggedIn()){
  this.router.navigate(['/']);
}

})

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
