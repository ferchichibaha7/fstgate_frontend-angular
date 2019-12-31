import { Comment } from './../../Models/comment';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';




const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
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

}
