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


  }

  ionViewDidLoad() {
    if (this.authenticationProvider.logged) {
      this.subscription = this.storageProvider.getCollection().subscribe(books => {
        this.booksDataProvider.booksFirebase = books;
        this.booksDataProvider.booksCollection = this.booksDataProvider.booksFirebase;
        this.booksDataProvider.sort(this.booksDataProvider.sortingMode);
      });
    } else {
      this.storageProvider.loadLocalStorage();      //Desde LocalStorage
      this.booksDataProvider.sort(this.booksDataProvider.sortingMode);
    }
  }

  ionViewDidEnter() {
    this.storageProvider.saveLastTab(0);
    this.authenticationProvider.actualPage = "HomePage";
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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
    if (this.authenticationProvider.logged) {
      this.storageProvider.deleteBookFireBase(book); //borrar libro de firebase
      this.storageProvider.saveLocalStorage(); //Guardar el array sin el libro borrado en localStorage
    }
    this.booksDataProvider.booksCollection.splice(index, 1); //borrar libro del array
    this.storageProvider.saveLocalStorage(); //Guardar el array sin el libro borrado en localStorage
  }

  goToDetails(book: Book) {
    this.navCtrl.push("DetailsPage", {"book": book});
  }

  sortingActionSheet() {
    this.booksDataProvider.presentActionSheet();
  }


}
