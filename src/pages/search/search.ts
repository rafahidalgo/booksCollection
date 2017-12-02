import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BooksDataProvider } from '../../providers/books-data/books-data';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  booksSearched: any[] = [];
  title: String;
  author: String;

  constructor(public navParams: NavParams,
              private bDP: BooksDataProvider) {
    this.title = this.navParams.get("title");
    this.author = this.navParams.get("author");
  }

  ionViewDidLoad() {
    this.bDP.getBooks(this.title, this.author).subscribe((books) =>
      this.booksSearched = books["items"]
    );
  }

}
