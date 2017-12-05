import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { BooksDataProvider } from '../../providers/books-data/books-data';
import { Book } from '../../interfaces/book';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  booksSearched: Book[] = [];
  title: String;
  author: String;

  constructor(public navParams: NavParams,
              private booksDataProvider: BooksDataProvider,
              private toastCtrl: ToastController) {

    this.title = this.navParams.get("title");
    this.author = this.navParams.get("author");

    this.booksDataProvider.getBooks(this.title, this.author).subscribe((books) =>
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


}
