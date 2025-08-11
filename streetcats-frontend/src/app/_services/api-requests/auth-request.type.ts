export interface SignUpRequest {
  name: string;
  email: string; 
  pwd: string;
}

export interface SignUpResponse {
  name: string;
}

export interface LogInRequest {
  email: string;
  pwd: string;
}

export interface LogInResponse {
  jwt: string;
}