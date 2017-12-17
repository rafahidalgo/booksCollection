import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

//models
import { Book } from '../../models/book.model';

//providers
import { MessagesProvider } from '../../providers/messages/messages';
import { BooksDataProvider } from '../../providers/books-data/books-data';
import { StorageProvider } from '../../providers/storage/storage';
import { AuthenticationProvider } from '../../providers/authentication/authentication';


@IonicPage()
@Component({
  selector: 'page-cover',
  templateUrl: 'cover.html',
})
export class CoverPage {

  subscription: Subscription;
  remove: boolean = false;

  constructor(public navCtrl: NavController,
              private modalCtrl: ModalController,
              private messagesProvider: MessagesProvider,
              public booksDataProvider: BooksDataProvider,
              private storageProvider: StorageProvider,
              private authenticationProvider: AuthenticationProvider) {

    //si nos logueamos, guardamos en local la colección
    if (this.authenticationProvider.logged) {
      this.loadCollection().then(() => {
        this.subscription.unsubscribe();
      });
    }
    //cargamos la coleccion del local
    this.storageProvider.loadLocalStorage();
    this.booksDataProvider.sort(this.booksDataProvider.sortingMode); //ordenamos

  }

  ionViewDidEnter() {
    this.storageProvider.saveLastTab(1); //para saber el tab en el que lo dejamos
    this.authenticationProvider.actualPage = "CoverPage"; //para saber que botones mostramos en el menú
  }

  //cargamos y salvamos en local
  loadCollection() {
    return new Promise(resolve => {
      this.subscription = this.storageProvider.getCollection().subscribe(books => {
        this.booksDataProvider.booksFirebase = books;
        this.booksDataProvider.booksCollection = this.booksDataProvider.booksFirebase;
        this.storageProvider.saveLocalStorage();
        resolve();
      });
    });
  }

  ionViewDidLeave() {
    this.remove = false; //Al cambiar de página o pestaña se desactiva el modo borrar
  }

  searchModal() {
    this.remove = false; //Si buscamos se desactiva el modo borrar
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

  goToDetails(book: Book) {
    this.navCtrl.push("DetailsPage", {"book": book});
  }

  sortingActionSheet() {
    this.booksDataProvider.presentActionSheet();
  }

  removeToggle() {
    this.remove = !this.remove;
    //Si no hay libros siempre estará desactivado
    if (this.booksDataProvider.booksCollection.length == 0) {
      this.remove = false;
    }
  }

  delete(book: Book, index: number) {
    this.storageProvider.delete(book, index);
  }

}
