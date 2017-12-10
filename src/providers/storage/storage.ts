import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Book } from '../../models/book.model';
import { Observable } from 'rxjs/Observable';
import { BooksDataProvider } from '../books-data/books-data';
import { FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase';

//import * as firebase from 'firebase'


@Injectable()
export class StorageProvider {

  books: any;
  userId: string;


  constructor(private angularFireDatabase: AngularFireDatabase,
              private booksDataProvider: BooksDataProvider) {
  }

  uploadBook(book: Book) {
    this.angularFireDatabase.object(`users/${this.userId}/${book.id}`).update(book);
  }

  deleteBookFireBase(book: Book) {
    this.angularFireDatabase.object(`users/${this.userId}/${book.id}`).remove();
  }

  getCollection() {
    return this.angularFireDatabase.list(`users/${this.userId}`).valueChanges();
  }

}
