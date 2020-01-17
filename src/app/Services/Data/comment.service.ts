import { Comment } from './../../Models/comment';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';




const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const httpOptions2 = {
  headers: new HttpHeaders({ 'Content-Type': 'image/png' })
};

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http:HttpClient) { }
  private baseurl: String = 'http://localhost:8080/';


  getComments(postid:number): Observable<any> {
    return this.http.get<any>(this.baseurl+'posts/'+postid+'/comments',httpOptions);
  }

createComment(postid:number,comment:Comment): Observable<any>{
  return this.http.post<any>(this.baseurl+'posts/'+postid+'/comments',comment,httpOptions);
}

deleteComment(postid:number,comId:number): Observable<any>{
  return this.http.delete<any>(this.baseurl+'posts/'+postid+'/comments/'+comId,httpOptions);
}

pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
  const formdata: FormData = new FormData();

  formdata.append('file', file);

  const req = new HttpRequest('POST', 'http://localhost:8080/api/file/upload', formdata, {
    reportProgress: true,
    responseType: 'text'
  });

  return this.http.request(req);
}

getFile(id:number): Observable<any> {
  const formdata: FormData = new FormData();
  return this.http.get('http://localhost:8080/api/file/'+id,{ responseType:'blob' as 'json' });
}






}
