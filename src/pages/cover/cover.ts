import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
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

  subscription: Subscription;
  remove: boolean = false;

  constructor(public navCtrl: NavController,
              private modalCtrl: ModalController,
              private messagesProvider: MessagesProvider,
              public booksDataProvider: BooksDataProvider,
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
    this.storageProvider.saveLastTab(1);
    this.authenticationProvider.actualPage = "CoverPage";
  }

  ionViewDidLeave(){
    this.remove=false; //Al cambiar de página o pestaña se desactiva el modo borrar
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  //Función repetida de HomePage
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

  //Función repetida de HomePage
  searchBooks(title: String, author: String, isbn: Number) {
    this.navCtrl.push('SearchPage', {'title': title, 'author': author, 'isbn': isbn});
  }

  //Función repetida de HomePage
  goToDetails(book: Book) {
    this.navCtrl.push("DetailsPage", {"book": book});
  }

  sortingActionSheet() {
    this.booksDataProvider.presentActionSheet();
  }

  removeToggle(){
    this.remove = !this.remove;
    //Si no hay libros siempre estará desactivado
    if (this.booksDataProvider.booksCollection.length==0) {
      this.remove = false;
    }
    console.log("libros:" + this.booksDataProvider.booksCollection.length);
    console.log(this.remove);
  }


  //Función repetida de HomePage
  delete(book: Book, index: number) {
    if (this.authenticationProvider.logged) {
      this.storageProvider.deleteBookFireBase(book); //borrar libro de firebase
    }
    this.booksDataProvider.booksCollection.splice(index, 1); //borrar libro del array
    this.storageProvider.saveLocalStorage(); //Guardar el array sin el libro borrado en localStorage
    console.log("Borrado: " + book)
  }

}
