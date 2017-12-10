import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { BooksDataProvider } from '../../providers/books-data/books-data';
import { Book } from '../../models/book.model';
import { MessagesProvider } from '../../providers/messages/messages';
import { StorageProvider } from '../../providers/storage/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private modalCtrl: ModalController,
              private navCtrl: NavController,
              public booksDataProvider: BooksDataProvider,
              private messagesProvider: MessagesProvider,
              private storageProvider: StorageProvider) {
  }

  searchModal() {
    let modal = this.modalCtrl.create('SearchModalPage');
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        this.searchBooks(data.title, data.author, data.isbn);
      } else {
        this.messagesProvider.createBasicAlert("Búsqueda cancelada");
      }
    });
  }

  ionViewDidEnter() {
    this.storageProvider.getCollection().subscribe(books => {
      this.booksDataProvider.booksFirebase = books;
      this.booksDataProvider.booksCollection = this.booksDataProvider.booksFirebase;
    });
  }

  searchBooks(title: String, author: String, isbn: Number) {
    this.navCtrl.push('SearchPage', {'title': title, 'author': author, 'isbn': isbn});
  }

  delete(book: Book) {
    let index = this.booksDataProvider.booksCollection.indexOf(book);
    this.booksDataProvider.booksCollection.splice(index, 1);
    this.storageProvider.deleteBookFireBase(book);
  }

  goToDetails(book: Book) {
    this.navCtrl.push("DetailsPage", {"book": book});
  }

}
