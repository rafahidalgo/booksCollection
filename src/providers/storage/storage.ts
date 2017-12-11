import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Book } from '../../models/book.model';
import { Observable } from 'rxjs/Observable';
import { BooksDataProvider } from '../books-data/books-data';
import { FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';

//import * as firebase from 'firebase'


@Injectable()
export class StorageProvider {

  books: any;
  userId: string;


  constructor(private angularFireDatabase: AngularFireDatabase,
              private booksDataProvider: BooksDataProvider,
              private storage: Storage,
              private platform: Platform) {
  }

  uploadBook(book: Book) {
    this.angularFireDatabase.object(`users/${this.userId}/${book.id}`).update(book);
  }

  saveLocalStorage() {
    let promise = new Promise((resolve, reject) => {
      if (this.platform.is('cordova')) {
        //Device
        this.storage.ready().then(() => {
          this.storage.set(`books${this.userId}`, this.booksDataProvider.booksCollection);
          resolve();
        });
      } else {
        //Desktop
        localStorage.setItem(`books${this.userId}`, JSON.stringify(this.booksDataProvider.booksCollection));
        resolve();
      }
    });
    return Promise;
  }

  deleteBookFireBase(book: Book) {
    this.angularFireDatabase.object(`users/${this.userId}/${book.id}`).remove();
  }

  getCollection() {
    return this.angularFireDatabase.list(`users/${this.userId}`).valueChanges();
  }

  loadLocalStorage() {
    let promise = new Promise(((resolve, reject) => {
      if (this.platform.is('cordova')) {
        //Dispositivo
        this.storage.ready().then(() => {
          this.storage.get(`books${this.userId}`).then((books => {
            if (books) { //Por si viniera vacío
              this.booksDataProvider.booksCollection = books;
            }
            resolve();
          }));
        });
      } else {
        //Escritorio
        if (localStorage.getItem(`books${this.userId}`)) {
          this.booksDataProvider.booksCollection = JSON.parse(localStorage.getItem(`books${this.userId}`));
        }
        resolve();
      }

    }));
    return Promise;

  }

}
