import { PostDetailsComponent } from './post-details/post-details.component';
import { map } from 'rxjs/operators';
import { CreateSubComponent } from './create-sub/create-sub.component';
import { ToastrService } from 'ngx-toastr';
import { Group } from './../Models/group';
import { TokenStorageService } from './../Services/Auth/token-storage.service';
import { Component, OnInit, enableProdMode } from '@angular/core';
import { UserService } from '../Services/Data/user.service';
import { async } from 'q';
import { CreatePostComponent } from './create-post/create-post.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  username: string;
  post:any
dis:boolean=false
  roles: string[] = [];
Uprofile:any
  group:any;
  subgroups:any;
  index:any;
 selectedgroup:any;
  groupid:number;
  allPosts:any;
  PendingUsers:any
  subposts:any;
  constructor(
    private tokenstorage:TokenStorageService,
    private userservice:UserService,
    public dialog: MatDialog,
    private toastr: ToastrService
    ) { }
    openDialog() : void {
      const dialogRef =this.dialog.open(CreatePostComponent, {
width:"60%",
        data: {
          subgroups: this.subgroups,

        }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.getProfGroups()
      });
    }
    openDialogSub() : void {
      const dialogRef =this.dialog.open(CreateSubComponent, {
width:"30%",
        data: {
          groupid: this.index,

        }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.getProfGroups()
      });
    }

    openDialogPost(post:any) : void {
      const dialogRef =this.dialog.open(PostDetailsComponent, {
width:"80%",
height:"80%",

        data: {
          post: post,

        }
      });
      dialogRef.afterClosed().subscribe(result => {



      });
    }

  ngOnInit() {


    this.getStudGroup();

    this.roles = this.tokenstorage.getAuthorities();
    this.username = this.tokenstorage.getUsername();



  }

  getStudGroup(){
    this.getUserProfile();
  this.userservice.getStudPrev().subscribe(data=>{
   if (this.selectedgroup){
     this.selectedgroup=this.index
   }
   else
  this.selectedgroup=data.group.id

  this.getProfGroups()
  this.GetPending()
});
}


getProfGroups(){
  this.userservice.getProfPrev().subscribe(data=>{
    this.group=data;
    console.log("okokokok"+this.group);



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
    this.allPosts=data
    console.log("post pipipip"+this.allPosts);
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
 getUsernameById(id:number){

  this.userservice.getUserProfileById(id).subscribe(data=>{
   return data
  })

}

deletePost(id:number){
  this.userservice.deletePost(id).subscribe(data=>{
    this.getProfGroups()
  })
}


owner(id:number){
  console.log(id);

 if (id==this.Uprofile.id)
return true
  else
 return false
}

GetPending(){
  this.userservice.getPending().subscribe(data=>{
this.PendingUsers=data;
  })
}

activateUser(id:number,name:String){
  this.userservice.activateUser(id).subscribe(data=>{
    console.log(data);
    this.toastr.success( name+' Activated successefully',' Activation');

    this.getStudGroup();

  })
}

disableSub(id:number){
  this.userservice.disableSub(id).subscribe(data=>{
    console.log(data);
    this.getProfGroups()
  })
}


}
