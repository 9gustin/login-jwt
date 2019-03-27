import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from 'src/app/models/user';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly URL_API='http://localhost:3000/api/user/';
  constructor(private http:HttpClient) { }

  login(form : NgForm){

    let headers = new HttpHeaders().set('Content-Type','application/json');
    let params = JSON.stringify(form);
    return this.http.post(this.URL_API+ 'login', params, {headers:headers});
  }
  register(form : NgForm){
    return this.http.post(this.URL_API, form);
  }

}
