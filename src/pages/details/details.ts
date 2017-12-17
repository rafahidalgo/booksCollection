import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//models
import { Book } from '../../models/book.model';

//providers
import { AuthenticationProvider } from '../../providers/authentication/authentication';


@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  book: Book;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private authenticationProvider: AuthenticationProvider) {

    this.book = this.navParams.get("book");

  }

  ionViewDidEnter(){
    this.authenticationProvider.actualPage = "DetailsPage";
  }



}
