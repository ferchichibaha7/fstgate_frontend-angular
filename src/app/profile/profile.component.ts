import { UserService } from 'src/app/Services/Data/user.service';
import { CommentService } from './../Services/Data/comment.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  image :any;
  Uprofile:any
  fileUploads: Observable<string[]>;
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };




  constructor(private httpClient: HttpClient,private commentService: CommentService, private sanitizer: DomSanitizer,private userservice:UserService) { }

  ngOnInit() {
    this.getUserProfile();



  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress.percentage = 0;

    this.currentFileUpload = this.selectedFiles.item(0);
    this.commentService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');

        this.getUserProfile()
      }

    });

    this.selectedFiles = undefined;
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
