import { Component, OnDestroy } from '@angular/core';
import { IonicPage, Loading, LoadingController, NavParams } from 'ionic-angular';
import { BooksDataProvider } from '../../providers/books-data/books-data';
import { Book } from '../../models/book.model';
import { MessagesProvider } from '../../providers/messages/messages';
import { StorageProvider } from '../../providers/storage/storage';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Observable } from 'rxjs/Observable';
import { SearchModalPage } from '../searchModal/searchModal';
import { Subscription } from 'rxjs/Subscription';


@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  booksSearched: Observable<any[]>;
  title: String;
  author: String;
  isbn: String;
  subscription: Subscription;

  constructor(public navParams: NavParams,
              private booksDataProvider: BooksDataProvider,
              private messagesProvider: MessagesProvider,
              private loadingCtrl: LoadingController,
              private storageProvider: StorageProvider,
              private authenticationProvider: AuthenticationProvider) {

    this.title = this.navParams.get("title");
    this.author = this.navParams.get("author");
    this.isbn = this.navParams.get("isbn");

    this.subscription = this.booksDataProvider.getBooks(this.title, this.author, this.isbn).subscribe((books) => {
        this.booksSearched = books["items"];
        this.messagesProvider.loading.dismiss();
      }
    );

  }

  ionViewDidEnter() {
    this.authenticationProvider.actualPage = "SearchPage";
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addBookToCollection(bookToAdd: any) {
    for (let books of this.booksDataProvider.booksCollection) {
      if (books.id == bookToAdd.id) {
        this.messagesProvider.createBasicAlert("El libro ya se encuentra en la colección");
        return;
      }
    }
    if (this.authenticationProvider.logged) {
      this.storageProvider.uploadBookFirebase(bookToAdd); //Guardar libro en firebase
      console.log("Firebase guardado!");
    }
    this.booksDataProvider.booksCollection.push(bookToAdd); //Añadir libro al array de libros
    console.log("array guardado!");
    this.storageProvider.saveLocalStorage(); //Guardar el array con el nuevo libro en localStorage
    console.log("local guardado!");
    this.messagesProvider.createToast("Libro añadido con éxito", 1000, "middle");
  }

  newSearch() {
    //TODO Implementar nueva búsqueda
  }

  //TODO Implementar búsqueda mediante captura de código de barras

}
