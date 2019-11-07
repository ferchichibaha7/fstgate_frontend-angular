import { Observable } from 'rxjs';
import { userinfo } from './../../login/login.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})



export class TestService {

  constructor(private http:HttpClient) { }

  private baseurl: String = 'http://localhost:8080/';


  getinfo(): Observable<userinfo> {
    return this.http.get<userinfo>(this.baseurl+'user/me',httpOptions);
  }



}
