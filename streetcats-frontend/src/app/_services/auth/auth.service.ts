import { Injectable, WritableSignal, effect, signal } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { AuthState } from './auth-state.type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  authState: WritableSignal<AuthState> = signal<AuthState>({
    name: this.getName(),
    email: this.getEmail(),
    token: this.getToken(),
    isAuthenticated: this.verifyToken(this.getToken())
  })

  constructor(){
    effect( () => {
      const token = this.authState().token;
      const name = this.authState().name;
      const email = this.authState().email;
      if(token !== null){
        localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("token");
      }
      if(name !== null){
        localStorage.setItem("name", name);
      } else {
        localStorage.removeItem("name");
      }
      if(email !== null){
        localStorage.setItem("email", email);
      } else {
        localStorage.removeItem("email");
      }
    });
  }

  async updateToken(token: string) {
    const decodedToken: any = jwtDecode(token);

    const name = this.decodeHtmlEntities(decodedToken.name);
    const email = decodedToken.email;

    this.authState.set({
      name: name,
      email: email,
      token: token,
      isAuthenticated: this.verifyToken(token)
    })
  }

  getToken(){
    return localStorage.getItem("token");
  }

  getName(){
    return localStorage.getItem("name");
  }

  getEmail(){
    return localStorage.getItem("email");
  }

  verifyToken(token: string | null): boolean {
    if(token !== null){
      try{
        const decodedToken = jwtDecode(token);
        const expiration = decodedToken.exp;
        if(expiration === undefined || Date.now() >= expiration * 1000){
          return false;
        } else {
          return true;
        }
      } catch(error) {
        return false;
      }
    }
    return false;
  }

  isUserAuthenticated(): boolean {
    return this.verifyToken(this.getToken());
  }

  logout(){
    this.authState.set({
      name: null,
      email: null,
      token: null,
      isAuthenticated: false
    });
  }

  decodeHtmlEntities(value: string): string {
    const parser = new DOMParser();
    const decoded = parser.parseFromString(value, "text/html");
    return decoded.documentElement.textContent || "";
  }
}
