import { CommentService } from './../../Services/Data/comment.service';
import { userinfo } from './../../login/login.component';
import { TokenStorageService } from './../../Services/Auth/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/Data/user.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
username: string;
name:string;
id:number
image:any
Uprofile:any;
  constructor(
    private userservice:UserService,
    private storage:TokenStorageService,
    private userprofile:UserService,
private commentService:CommentService, private sanitizer: DomSanitizer
    ) { }

  ngOnInit() {
    this.getUserProfile()


  }
  logout() {
    this.storage.signOut();
    window.location.reload();
  }
  showFiles(id:number) {
    this.commentService.getFile(id).subscribe(data=>{
      let unsafeImageUrl = URL.createObjectURL(data);
      this.image = this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);
  }, error => {
      console.log(error);
    });


  }

  getUserProfile(){
    this.userservice.getUserProfile().subscribe(data=>{
      this.Uprofile=data;
      console.log("houo :"+this.Uprofile);
this.showFiles(this.Uprofile.ppic)
    })
  }

}
