import { Group } from './../Models/group';
import { TokenStorageService } from './../Services/Auth/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/Data/user.service';
import { async } from 'q';
import { CreatePostComponent } from './create-post/create-post.component';
import { MatDialog } from '@angular/material/dialog';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  username: string;
  post:any

  roles: string[] = [];
Uprofile:any
  group:any;
  subgroups:any;
  index:any;
 selectedgroup:any;
  groupid:number;
  allPosts:any;
  subposts:any;
  constructor(
    private tokenstorage:TokenStorageService,
    private userservice:UserService,
    public dialog: MatDialog
    ) { }
    openDialog() : void {
      const dialogRef =this.dialog.open(CreatePostComponent, {
        data: {
          animal: 'panda'
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.post = result;
        console.log(this.post);
        this.getProfGroups()
      });
    }

  ngOnInit() {
 this.getStudGroup();

 console.log("index in init:"+ this.index);

 this.getUserProfile();


    this.roles = this.tokenstorage.getAuthorities();
    this.username = this.tokenstorage.getUsername();
  this.getProfGroups()

  }

  getStudGroup(){
  this.userservice.getStudPrev().subscribe(data=>{
   if (this.selectedgroup){
     this.selectedgroup=this.index
   }
   else
  this.selectedgroup=data.group.id


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
    this.index=gid

    console.log("index in prof:"+ this.index);




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

getUserProfile(){
  this.userservice.getUserProfile().subscribe(data=>{
    this.Uprofile=data;
  })
}

deletePost(id:number){
  this.userservice.deletePost(id).subscribe(data=>{
    this.getProfGroups()
  })
}


owner(id:number){
  console.log("fffffffffff"+this.Uprofile.id);

  if (id==this.Uprofile.id)
return true
  else
 return false
}


}
