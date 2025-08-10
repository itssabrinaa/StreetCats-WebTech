import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { LogInRequest, LogInResponse, SignUpRequest, SignUpResponse } from './auth-request.type';

@Injectable({
  providedIn: 'root'
})
export class ApiAuthService {

  url = environment.apiUrl;
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  signup(signupRequest: SignUpRequest){
    const url = `${this.url}/signup`;
    return this.http.post<SignUpResponse>(url, signupRequest, this.httpOptions);
  }

  login(loginRequest: LogInRequest){
    const url = `${this.url}/login`; 
    return this.http.post<LogInResponse>(url, loginRequest, this.httpOptions);
  }

}
