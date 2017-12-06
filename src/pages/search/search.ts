import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { BooksDataProvider } from '../../providers/books-data/books-data';
import { Book } from '../../models/book.model';
import { ToastController, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  booksSearched: Book[] = [];
  title: String;
  author: String;
  isbn: Number;

  constructor(public navParams: NavParams,
              private booksDataProvider: BooksDataProvider,
              private toastCtrl: ToastController,
              private navCtrl: NavController) {

    this.title = this.navParams.get("title");
    this.author = this.navParams.get("author");
    this.isbn = this.navParams.get("isbn");

    this.booksDataProvider.getBooks(this.title, this.author, this.isbn).subscribe((books) =>
      this.booksSearched = books["items"]
    );

  }

  addBookToCollection(bookToAdd: any) {
    for (let books of this.booksDataProvider.booksCollection) {
      if (books.volumeInfo.title == bookToAdd.volumeInfo.title) {
        this.toastCtrl.create({
          message: "El libro ya se encuentra en la colección",
          duration: 1500,
          position: "middle"
        }).present();
        return;
      }
    }
    this.booksDataProvider.booksCollection.push(bookToAdd);
    this.toastCtrl.create({
      message: "Libro añadido con éxito",
      duration: 1000,
      position: "middle"
    }).present();
  }

  newSearch() {
    //TODO Implementar nueva búsqueda
  }

  //TODO Implementar búsqueda mediante captura de código de barras

}
