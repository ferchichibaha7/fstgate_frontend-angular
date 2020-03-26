import { Observable } from 'rxjs';
import { userinfo } from './../../login/login.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Group } from 'src/app/Models/group';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})



export default class TestService {

  constructor(private http:HttpClient) { }

  private baseurl: String = 'http://localhost:8080/';


  getinfo(): Observable<userinfo> {
    return this.http.get<userinfo>(this.baseurl+'user/me',httpOptions);
  }


getGroups():Observable<Group[]>{
  return this.http.get<Group[]>(this.baseurl+'api/auth/groups',httpOptions)
}


}
