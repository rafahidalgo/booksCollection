import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { MessagesProvider } from '../../providers/messages/messages';
import { BooksDataProvider } from '../../providers/books-data/books-data';
import { Book } from '../../models/book.model';
import { StorageProvider } from '../../providers/storage/storage';

@IonicPage()
@Component({
  selector: 'page-cover',
  templateUrl: 'cover.html',
})
export class CoverPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private modalCtrl: ModalController,
              private messagesProvider: MessagesProvider,
              public booksDataProvider: BooksDataProvider,
              private storageProvider: StorageProvider) {

    //Desde Firebase
    /*this.storageProvider.getCollection().subscribe(books => {
      this.booksDataProvider.booksFirebase = books;
      this.booksDataProvider.booksCollection = this.booksDataProvider.booksFirebase;
    });
*/
    //Desde LocalStorage
    this.storageProvider.loadLocalStorage();

  }

  ionViewDidLoad(){
    this.storageProvider.tab = 1;
    this.storageProvider.saveLastTab();
  }

  //Función repetida de HomePage
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

  //Función repetida de HomePage
  searchBooks(title: String, author: String, isbn: Number) {
    this.navCtrl.push('SearchPage', {'title': title, 'author': author, 'isbn': isbn});
  }

  //Función repetida de HomePage
  goToDetails(book: Book) {
    this.navCtrl.push("DetailsPage", {"book": book});
  }

}
