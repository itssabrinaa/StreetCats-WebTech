import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { CatResponse, CatsResponse, CreateCatResponse } from './cat-request.type';

@Injectable({
  providedIn: 'root'
})
export class ApiCatService {

  url = environment.apiUrl;
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getCats(){
    const url = `${this.url}/cats`;
    return this.http.get<CatsResponse>(url, this.httpOptions);
  }

  getCat(id: number){
    const url = `${this.url}/cats/${id}`;
    return this.http.get<CatResponse>(url, this.httpOptions);
  }

  createCat(createCatRequest: FormData){
    const url = `${this.url}/cats`;
    return this.http.post<CreateCatResponse>(url, createCatRequest);
  }

}
