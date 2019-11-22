import { userinfo } from './../../login/login.component';
import { TokenStorageService } from './../../Services/Auth/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/Data/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
username: string;
name:string;
id:number
  constructor(
    private storage:TokenStorageService,
    private userprofile:UserService

    ) { }

  ngOnInit() {
   this.userprofile.getUserProfile().subscribe(userinfo=>{
this.username=userinfo.username;
this.name=userinfo.name;
this.id=userinfo.id;
    });
  }
  logout() {
    this.storage.signOut();
    window.location.reload();
  }
}
