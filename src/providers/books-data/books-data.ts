import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Book } from '../../models/book.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BooksDataProvider {

  booksFirebase: any[] = [];
  booksCollection: Book[] = [];

  constructor(private http: HttpClient) {

  }

  getBooks(title: String, author: String, isbn: String): Observable<any> {
    if (title && author && !isbn) {
      return this.http.get(`https://www.googleapis.com/books/v1/volumes?q="${title}"+inauthor:${author}&key=AIzaSyC4bVaIsHrFcf01d0daPuYH9MYx2jZpfLQ`);
    } else if (title && !author && !isbn) {
      return this.http.get(`https://www.googleapis.com/books/v1/volumes?q="${title}"&key=AIzaSyC4bVaIsHrFcf01d0daPuYH9MYx2jZpfLQ`);
    } else if (!title && author && !isbn) {
      return this.http.get(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${author}&key=AIzaSyC4bVaIsHrFcf01d0daPuYH9MYx2jZpfLQ`);
    } else if (!title && !author && isbn) {
      return this.http.get(`https://www.googleapis.com/books/v1/volumes?q=ISBN${isbn}&key=AIzaSyC4bVaIsHrFcf01d0daPuYH9MYx2jZpfLQ`);
    }

  }

}
