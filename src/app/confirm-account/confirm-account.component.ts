import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../Services/Data/user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.scss']
})
export class ConfirmAccountComponent implements OnInit {

token:string;

  constructor(private route: ActivatedRoute, private userservice:UserService, private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {

    this.token = this.route.snapshot.paramMap.get('token');
console.log(this.token);
this.userservice.confirmEmail(this.token).subscribe(data=>{
  console.log(data);
  this.toastr.success('Account verified', 'Please login!');

  this.router.navigate(['login']);
},
error => {
  console.log(error);
  this.toastr.error('Link invalid or broken!');
  this.router.navigate(['login']);
})

  }

}
