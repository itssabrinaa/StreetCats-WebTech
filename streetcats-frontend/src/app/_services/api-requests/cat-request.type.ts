import { Comment } from "./comment-request.type";

export interface CatSummary{
  id: number;
  title: string;
  lat: number;
  lon: number;
  createdAt: string;
  User?: {
    name: string;
  };
}

export interface Cat extends CatSummary{
  img: string;
  desc: string;
  updatedAt: string;
  UserEmail: string;
}

export interface CatDetails extends Cat{
  Comments: Comment[];
}

export interface CreateCatRequest {
  img: string;
  title: string;
  desc: string;
  lat: number;
  lon: number;
}

export interface CreateCatResponse {
  new_cat: Cat;
}

export interface CatResponse {
  cat: CatDetails;
}

export interface CatsResponse {
  cats: CatSummary[];
}
