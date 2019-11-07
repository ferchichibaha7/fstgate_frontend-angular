import { userinfo } from './../../login/login.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private _http:HttpClient) { }

  private baseurl: String = 'http://localhost:8080/';


getinfo(){
return this._http.get<userinfo>( this.baseurl + 'user/me');

}

}
