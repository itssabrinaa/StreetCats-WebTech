import { Comment } from "./comment-request.type";

export interface CatSummary{
  id: number;
  title: string;
  lat: number;
  lon: number;
  createdAt: string;
}

export interface Cat extends CatSummary{
  img: string;
  desc: string;
  UserEmail: string;
  updatedAt: string;
}

export interface CatDetails extends Cat{
  comments: Comment[];
}

export interface CreateCatRequest {
  img: string,
  title: string;
  desc: string;
  lat: number;
  lon: number;
}

export interface CreateCatResponse {
  new_cat: Cat;
}

export interface CatResponse {
  cat: Cat;
}

export interface CatsResponse {
  cats: CatSummary[];
}
