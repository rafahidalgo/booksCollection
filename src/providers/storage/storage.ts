import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

//models
import { Book } from '../../models/book.model';

//plugins
import { AngularFireDatabase } from 'angularfire2/database';
import { Storage } from '@ionic/storage';

//providers
import { BooksDataProvider } from '../books-data/books-data';
import { AuthenticationProvider } from '../authentication/authentication';

@Injectable()
export class StorageProvider {

  books: any;
  userId: string;
  tab: number = 0;


  constructor(private angularFireDatabase: AngularFireDatabase,
              private booksDataProvider: BooksDataProvider,
              private storage: Storage,
              private platform: Platform,
              private authenticationProvider: AuthenticationProvider) {
  }

  delete(book: Book, index: number) {
    if (this.authenticationProvider.logged) {
      this.deleteBookFireBase(book); //borrar libro de firebase
    }
    this.booksDataProvider.booksCollection.splice(index, 1); //borrar libro del array
    this.saveLocalStorage(); //Guardar el array sin el libro borrado en localStorage
  }

  /***************
   ** Firebase ***
   ***************/

  uploadBookFirebase(book: Book) {
    this.angularFireDatabase.object(`users/${this.userId}/${book.id}`).update(book);
  }

  deleteBookFireBase(book: Book) {
    this.angularFireDatabase.object(`users/${this.userId}/${book.id}`).remove();
  }

  getCollection() {
    return this.angularFireDatabase.list(`users/${this.userId}`).valueChanges();
  }

  /*******************
   ** Local Storage **
   *******************/

  saveLocalStorage() {
    return new Promise(resolve => {
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
  }

  loadLocalStorage() {
    return new Promise(resolve => {
      if (this.platform.is('cordova')) {
        //Dispositivo
        this.storage.ready().then(() => {
          this.storage.get(`books${this.userId}`).then(books => {
            if (books) { //Por si viniera vacío
              this.booksDataProvider.booksCollection = books;
            }
            resolve();
          });
        });
      } else {
        //Escritorio
        if (localStorage.getItem(`books${this.userId}`)) {
          this.booksDataProvider.booksCollection = JSON.parse(localStorage.getItem(`books${this.userId}`));
        }
        resolve();
      }
    });
  }

  saveLastTab(tab: number) {
    return new Promise(resolve => {
      if (this.platform.is('cordova')) {
        //Device
        this.storage.ready().then(() => {
          this.storage.set(`tab${this.userId}`, tab);
          resolve();
        });
      } else {
        //Desktop
        localStorage.setItem(`tab${this.userId}`, JSON.stringify(tab));
        resolve();
      }
    });
  }

  loadLastTab() {
    return new Promise(resolve => {
      if (this.platform.is('cordova')) {
        //Dispositivo
        this.storage.ready().then(() => {
          this.storage.get(`tab${this.userId}`).then(tab => {
            if (tab) { //Por si viniera vacío
              this.tab = tab;
            }
            resolve(); //Si no existe tab, se deja como está (por defecto a 0)
          });
        });
      } else {
        //Escritorio
        if (localStorage.getItem(`tab${this.userId}`)) {
          this.tab = JSON.parse(localStorage.getItem(`tab${this.userId}`));
        }
        resolve();
      }
    });
  }

}
