import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private _http:HttpClient) { }

  private baseurl: String = 'http://localhost:8080/';
  private options = {
    headers: new HttpHeaders().append('Content-Type', 'application/json'),};

getinfo(){
return this._http.get<any>( this.baseurl + 'user/me', this.options);

}

}
