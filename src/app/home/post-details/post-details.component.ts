import { Comment } from './../../Models/comment';
import { GetusernamePipe } from './../../pipe/getusername.pipe';
import { UserProfile } from './../../Models/UserProfile';
import { CommentService } from './../../Services/Data/comment.service';
import { Component, OnInit, Inject, PipeTransform, Pipe } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/Services/Data/user.service';
import { map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

com:any
user:any
  comments:any;
  Uprofile:any
  constructor(public dialogRef: MatDialogRef<PostDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ,private userservice:UserService,private commentservice:CommentService) { }
post:any;

  ngOnInit() {
this.post=this.data.post
this.getcomments(this.post.id);
this.getUserProfile()
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
 reloadPage() {
  window.location.reload();
}

getcomments(idpost:number){
this.commentservice.getComments(idpost).subscribe(data=>{


  this.comments=data




})
}
onSubmit(form: NgForm) {
  console.log('Your form data : ', form.value);
this.com =new Comment  (form.value.text)
this.commentservice.createComment(this.post.id,this.com).subscribe(data=>{
this.getcomments(this.post.id)
form.reset();
})

}
deletecomment(idcom:number){
  this.commentservice.deleteComment(this.post.id,idcom).subscribe(data=>{

console.log(data);
this.getcomments(this.post.id)
  })
  }

  getUserProfile(){
    this.userservice.getUserProfile().subscribe(data=>{
      this.Uprofile=data;
    })
  }
  owner(com){

console.log(com);

    if (com==this.Uprofile.id)
   return true
     else
    return false
   }




}


