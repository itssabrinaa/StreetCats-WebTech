import { Injectable, WritableSignal, computed, effect, signal } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { AuthState } from './auth-state.type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  authState: WritableSignal<AuthState> = signal<AuthState>({
    name: this.getName(),
    email: this.getEmail(),
    token: this.getToken(), //get token from localStorage, if there
    isAuthenticated: this.verifyToken(this.getToken()) //verify it's not expired
  })

  name = computed(() => this.authState().name);
  email = computed(() => this.authState().email);
  token = computed(() => this.authState().token);
  isAuthenticated = computed(() => this.authState().isAuthenticated);

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
        localStorage.setItem("user", email);
      } else {
        localStorage.removeItem("user");
      }
    });
  }

  async updateToken(token: string) {
    const decodedToken: any = jwtDecode(token);
    const name = decodedToken.name;
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
          return false; //expiration not available or in the past
        } else {
          return true; //token not expired
        }
      } catch(error) {  //invalid token
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
}
