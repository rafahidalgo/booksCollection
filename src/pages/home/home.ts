import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Book } from '../../interfaces/book';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  booksCollection: Book[] = [];

  constructor(public navCtrl: NavController) {

  }

}
