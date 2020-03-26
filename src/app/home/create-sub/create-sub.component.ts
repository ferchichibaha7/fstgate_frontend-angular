import { SubGroup } from './../../Models/subgroup';
import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/Services/Data/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-sub',
  templateUrl: './create-sub.component.html',
  styleUrls: ['./create-sub.component.scss']
})
export class CreateSubComponent implements OnInit {
sub:SubGroup
  form: any = {};
groupid:number
  constructor( public dialogRef: MatDialogRef<CreateSubComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ,private userservice:UserService) { }

  ngOnInit() {
this.groupid=this.data.groupid
console.log("peeeeeeeeeerrrraa"+this.data.groupid);

  }


  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit(form: NgForm) {
    console.log('Your form data : ', form.value);

    this.sub=new SubGroup(
    form.value.title
    )

    this.userservice.createSub(this.groupid,this.sub.name).subscribe(data=>{
      console.log("we create :"+data)

      this.dialogRef.close();
    })

 }
 reloadPage() {
  window.location.reload();
}

}
