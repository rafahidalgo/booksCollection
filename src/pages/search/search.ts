import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { BooksDataProvider } from '../../providers/books-data/books-data';
import { Book } from '../../models/book.model';
import { MessagesProvider } from '../../providers/messages/messages';

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

  constructor(public navParams: NavParams,
              private booksDataProvider: BooksDataProvider,
              private messagesProvider: MessagesProvider) {

    this.title = this.navParams.get("title");
    this.author = this.navParams.get("author");
    this.isbn = this.navParams.get("isbn");

    this.booksDataProvider.getBooks(this.title, this.author, this.isbn).subscribe((books) =>
      this.booksSearched = books["items"]
    );

  }

  addBookToCollection(bookToAdd: any) {
    for (let books of this.booksDataProvider.booksCollection) {
      if (books.volumeInfo.title == bookToAdd.volumeInfo.title) {
        this.messagesProvider.createBasicAlert("El libro ya se encuentra en la colección");
        return;
      }
    }
    this.booksDataProvider.booksCollection.push(bookToAdd);
    this.messagesProvider.createToast("Libro añadido con éxito", 1000, "middle");
  }

  newSearch() {
    //TODO Implementar nueva búsqueda
  }

  //TODO Implementar búsqueda mediante captura de código de barras

}
