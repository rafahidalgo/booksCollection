import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { MessagesProvider } from '../../providers/messages/messages';
import { BooksDataProvider } from '../../providers/books-data/books-data';
import { Book } from '../../models/book.model';
import { StorageProvider } from '../../providers/storage/storage';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Subscription } from 'rxjs/Subscription';

@IonicPage()
@Component({
  selector: 'page-cover',
  templateUrl: 'cover.html',
})
export class CoverPage {

  subs: Subscription;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private modalCtrl: ModalController,
              private messagesProvider: MessagesProvider,
              public booksDataProvider: BooksDataProvider,
              private storageProvider: StorageProvider,
              private authenticationProvider: AuthenticationProvider) {


  }

  ionViewDidLoad() {
    //Desde Firebase
    if (this.authenticationProvider.logged) {
      this.subs = this.storageProvider.getCollection().subscribe(books => {
        this.booksDataProvider.booksFirebase = books;
        this.booksDataProvider.booksCollection = this.booksDataProvider.booksFirebase;
      });
    } else {
      //Desde LocalStorage
      this.storageProvider.loadLocalStorage();
    }
  }

  ionViewDidEnter() {
    this.storageProvider.saveLastTab(1);
  }

  ngOnDestroy(){
    if (this.subs) {
      this.subs.unsubscribe();
    }
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