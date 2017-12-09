import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Book } from '../../models/book.model';


@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  book: Book;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {

    this.book = this.navParams.get("book");
    console.log(this.book);

  }



}
