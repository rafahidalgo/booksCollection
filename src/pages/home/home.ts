import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { BooksDataProvider } from '../../providers/books-data/books-data';
import { Book } from '../../models/book.model';
import { MessagesProvider } from '../../providers/messages/messages';
import { StorageProvider } from '../../providers/storage/storage';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  subscription: Subscription;

  constructor(private modalCtrl: ModalController,
              private navCtrl: NavController,
              public booksDataProvider: BooksDataProvider,
              private messagesProvider: MessagesProvider,
              private storageProvider: StorageProvider,
              private authenticationProvider: AuthenticationProvider) {

    if (this.authenticationProvider.logged) {
      this.loadCollection().then(()=>{
        this.subscription.unsubscribe();
      });
    }
    this.storageProvider.loadLocalStorage();
    this.booksDataProvider.sort(this.booksDataProvider.sortingMode);

  }

  ionViewDidEnter() {
    this.storageProvider.saveLastTab(0);
    this.authenticationProvider.actualPage = "HomePage";
  }

  loadCollection(){
    return new Promise(resolve => {
      this.subscription = this.storageProvider.getCollection().subscribe(books => {
        this.booksDataProvider.booksFirebase = books;
        this.booksDataProvider.booksCollection = this.booksDataProvider.booksFirebase;
        this.storageProvider.saveLocalStorage();
        resolve();
      });
    });
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

  searchBooks(title: String, author: String, isbn: Number) {
    this.navCtrl.push('SearchPage', {'title': title, 'author': author, 'isbn': isbn});
  }

  delete(book: Book, index: number) {
    this.storageProvider.delete(book, index);
  }

  goToDetails(book: Book) {
    this.navCtrl.push("DetailsPage", {"book": book});
  }

  sortingActionSheet() {
    this.booksDataProvider.presentActionSheet();
  }

}
