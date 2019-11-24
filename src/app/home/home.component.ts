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
  group:any;
  subgroups:any;
  index:any=0;
 selectedgroup:any=0;
  groupid:number;
  allPosts:any;
  subposts:any;
  constructor(
    private tokenstorage:TokenStorageService,
    private userservice:UserService
    ) { }

  ngOnInit() {
    this.roles = this.tokenstorage.getAuthorities();
    this.username = this.tokenstorage.getUsername();
console.log(this.roles);

if(this.roles[0]=="ROLE_STUD"){
  this.getProfGroups()
}

else this.getProfGroups()






  }

 getStudGroup(){
  this.userservice.getStudPrev().subscribe(data=>{
    this.group=data;

console.log(this.groupid);

});
}


getProfGroups(){
  this.userservice.getProfPrev().subscribe(data=>{
    this.group=data;
    console.log(this.group);
    let gid=this.selectedgroup;
    this.getsub(gid);
    this.allPosts=this.getgroupPosts(gid)
    console.log("this is selected group:"+this.selectedgroup);


  })
}

getgroupPosts(id:number){
  this.userservice.getPostsByGroup(id).subscribe(data=>{
    this.allPosts=data;
    console.log(this.allPosts);

  })
}

getsubPosts(id:number){
  this.userservice.getPostsBySubGroup(id).subscribe(data=>{
this.allPosts=data;
  })
}

getsub(id:number){
  this.userservice.getSubByGroup(id).subscribe(data=>{
this.subgroups=data;
  })
}


}
