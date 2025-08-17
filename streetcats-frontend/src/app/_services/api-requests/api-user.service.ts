import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { UsersMeResponse } from './user-request.type';

@Injectable({
  providedIn: 'root'
})
export class ApiUserService {

  url = environment.apiUrl;
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getUsersMe(){
    const url = `${this.url}/users/me`;
    return this.http.get<UsersMeResponse>(url, this.httpOptions);
  }

}
