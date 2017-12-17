import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { BooksDataProvider } from '../../providers/books-data/books-data';
import { MessagesProvider } from '../../providers/messages/messages';
import { StorageProvider } from '../../providers/storage/storage';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Observable } from 'rxjs/Observable';
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
    }
    this.booksDataProvider.booksCollection.push(bookToAdd); //Añadir libro al array de libros
    this.booksDataProvider.sort(this.booksDataProvider.sortingMode); //Ordeno el array según el criterio de ordenación
    this.storageProvider.saveLocalStorage(); //Guardar el array con el nuevo libro en localStorage
    this.messagesProvider.createToast("Libro añadido con éxito", 500, "middle");
  }

}
