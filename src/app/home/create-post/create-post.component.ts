import { Post } from './../../Models/post';
import { UserService } from 'src/app/Services/Data/user.service';
import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../home.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
post:Post
form: any = {};
subid:any
  constructor(
    public dialogRef: MatDialogRef<CreatePostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData ,private userservice:UserService) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit(form: NgForm) {
    console.log('Your form data : ', form.value);
    this.post=new Post(
    form.value.title,
    form.value.description,
    )
    this.subid=form.value.subid;
    console.log(this.post , this.subid);


    this.userservice.createPost(this.subid,this.post).subscribe(data=>{
      console.log(data)

      this.dialogRef.close();
    })
 }
 reloadPage() {
  window.location.reload();
}
}
