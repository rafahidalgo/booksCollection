import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class BooksDataProvider {

  constructor(public http: HttpClient) {
    console.log('Hello BooksDataProvider Provider');
  }

  getBooks(title: String, author: String) {
    if (title && author) {
      return this.http.get(`https://www.googleapis.com/books/v1/volumes?q=${title}+inauthor:${author}&key=AIzaSyAGLh_QvOsVLGyX337USOQLeWyEj9LJHdw`);
    } else if (title && !author) {
      return this.http.get(`https://www.googleapis.com/books/v1/volumes?q=${title}&key=AIzaSyAGLh_QvOsVLGyX337USOQLeWyEj9LJHdw`);
    } else if (!title && author) {
      return this.http.get(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${author}&key=AIzaSyAGLh_QvOsVLGyX337USOQLeWyEj9LJHdw`);
    }
    //return this.http.get("../../assets/data/data.json");
  }

}
