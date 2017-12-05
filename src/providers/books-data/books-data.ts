import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../../interfaces/book';


@Injectable()
export class BooksDataProvider {

  booksCollection: Book[] = [];

  constructor(private http: HttpClient) {
  }

  getBooks(title: String, author: String) {
    if (title && author) {
      return this.http.get(`https://www.googleapis.com/books/v1/volumes?q=${title}+inauthor:${author}&key=AIzaSyC4bVaIsHrFcf01d0daPuYH9MYx2jZpfLQ`);
    } else if (title && !author) {
      return this.http.get(`https://www.googleapis.com/books/v1/volumes?q=${title}&key=AIzaSyC4bVaIsHrFcf01d0daPuYH9MYx2jZpfLQ`);
    } else if (!title && author) {
      return this.http.get(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${author}&key=AIzaSyC4bVaIsHrFcf01d0daPuYH9MYx2jZpfLQ`);
    }
  }

}
