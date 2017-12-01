import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { Book } from '../../interfaces/book';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  booksCollection: Book[] = [];
  searchedTitle: string;
  searchebAuthor: string;

  constructor(private modalCtrl: ModalController) {

  }

  showSearch() {
    let modal = this.modalCtrl.create('SearchModalPage');
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        this.searchedTitle = data.title;
        this.searchebAuthor = data.author;
      }
    });
  }

}
