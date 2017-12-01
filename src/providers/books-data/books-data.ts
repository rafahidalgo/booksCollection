import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class BooksDataProvider {

  constructor(public http: HttpClient) {
    console.log('Hello BooksDataProvider Provider');
  }

  getBooks() {
    return this.http.get('');
  }

}
