import { TokenStorageService } from './../Services/Auth/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/Data/user.service';
import { async } from 'q';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  username: string;
  roles: string[] = [];
  group:string;
  groupid:number;
  allPosts:any;
  constructor(
    private tokenstorage:TokenStorageService,
    private userservice:UserService
    ) { }

  ngOnInit() {
    this.roles = this.tokenstorage.getAuthorities();
    this.username = this.tokenstorage.getUsername();

this.getgroup()





  }

 getgroup(){
  this.userservice.getUserPrev().subscribe(data=>{
    this.group=data.group.name;
    this.groupid=data.group.id;
console.log(this.groupid);
this.getgroupPosts(this.groupid)
});


}

getgroupPosts(id:number){
  this.userservice.getPostsByGroup(id).subscribe(data=>{
    this.allPosts=data;
    console.log(this.allPosts);

  })
}

}
