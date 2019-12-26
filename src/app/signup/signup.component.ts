import { TokenStorageService } from './../Services/Auth/token-storage.service';
import { Group } from './../Models/group';
import { TestService } from './../Services/Data/test.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/Auth/auth.service';
import { SignUpInfo } from '../Services/Auth/signup-info';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  constructor(
    private authService: AuthService,
    private router: Router ,
    private testService: TestService,
    private storage:TokenStorageService,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
this.testService.getGroups().subscribe(data=>{
this.groups=data;
if (this.storage.getToken()) {
  this.router.navigate(['/']);
}
console.log(this.storage.isUserLoggedIn());
console.log(this.storage.isUserLoggedIn());



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

          this.toastr.success(' Your registration is successful', ' Please login!');

          this.router.navigate(['login']);
        //5s
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
        this.toastr.error(this.errorMessage,'Signup failed!');
      }
    );
  }


}
