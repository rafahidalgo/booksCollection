import { Component } from '@angular/core';
import { IonicPage, Loading, LoadingController, NavParams } from 'ionic-angular';
import { BooksDataProvider } from '../../providers/books-data/books-data';
import { Book } from '../../models/book.model';
import { MessagesProvider } from '../../providers/messages/messages';
import { StorageProvider } from '../../providers/storage/storage';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  booksSearched: Book[] = [];
  title: String;
  author: String;
  isbn: String;

  loading: Loading;

  constructor(public navParams: NavParams,
              private booksDataProvider: BooksDataProvider,
              private messagesProvider: MessagesProvider,
              private loadingCtrl: LoadingController,
              private storageProvider: StorageProvider) {

    this.title = this.navParams.get("title");
    this.author = this.navParams.get("author");
    this.isbn = this.navParams.get("isbn");

    this.booksDataProvider.getBooks(this.title, this.author, this.isbn).subscribe((books) => {
        this.booksSearched = books["items"];
        this.loading.dismiss();
      }
    );
    this.loading = this.loadingCtrl.create({
      content: "Por favor, espere..."
    });
    this.loading.present();
  }

  addBookToCollection(bookToAdd: any) {
    for (let books of this.booksDataProvider.booksCollection) {
      if (books.id == bookToAdd.id) {
        this.messagesProvider.createBasicAlert("El libro ya se encuentra en la colección");
        return;
      }
    }
    this.storageProvider.uploadBook(bookToAdd);
    this.booksDataProvider.booksCollection.push(bookToAdd);
    this.messagesProvider.createToast("Libro añadido con éxito", 1000, "middle");
  }

  newSearch() {
    //TODO Implementar nueva búsqueda
  }

  //TODO Implementar búsqueda mediante captura de código de barras

}
