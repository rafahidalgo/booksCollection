import { Component } from '@angular/core';
import { ModalController, ToastController, NavController } from 'ionic-angular';
import { BooksDataProvider } from '../../providers/books-data/books-data';
import { Book } from '../../models/book.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private modalCtrl: ModalController,
              private toastCtrl: ToastController,
              private navCtrl: NavController,
              public booksDataProvider: BooksDataProvider) {
  }

  searchModal() {
    let modal = this.modalCtrl.create('SearchModalPage');
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        this.searchBooks(data.title, data.author, data.isbn);
      } else {
        this.toastCtrl.create({
          message: 'Búsqueda cancelada',
          duration: 1000,
          position: "middle"
        }).present();
      }
    });
  }

  searchBooks(title: String, author: String, isbn: Number) {
    this.navCtrl.push('SearchPage', {'title': title, 'author': author, 'isbn': isbn});
  }

  delete(book: Book) {
    let index = this.booksDataProvider.booksCollection.indexOf(book);
    this.booksDataProvider.booksCollection.splice(index, 1);
  }

}
