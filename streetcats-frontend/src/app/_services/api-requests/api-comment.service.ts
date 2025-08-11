import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { CommentRequest, CommentResponse } from './comment-request.type';

@Injectable({
  providedIn: 'root'
})
export class ApiCommentService {

  url = environment.apiUrl;
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  createComment(createCommentRequest: CommentRequest){
    const url = `${this.url}/comment`;
    return this.http.post<CommentResponse>(url, createCommentRequest, this.httpOptions);
  }

}
