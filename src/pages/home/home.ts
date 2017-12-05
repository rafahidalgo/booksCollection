import { Component } from '@angular/core';
import { ModalController, ToastController, NavController } from 'ionic-angular';
import {BooksDataProvider} from '../../providers/books-data/books-data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  searchedTitle: string;
  searchedAuthor: string;

  constructor(private modalCtrl: ModalController,
              private toastCtrl: ToastController,
              private navCtrl: NavController,
              public booksDataProvider: BooksDataProvider) {
  }

  searchModal() {
    let modal = this.modalCtrl.create('SearchModalPage');
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        this.searchedTitle = data.title;
        this.searchedAuthor = data.author;
        this.searchBooks(this.searchedTitle, this.searchedAuthor);
      } else {
        this.toastCtrl.create({
          message: 'Búsqueda cancelada',
          duration: 1000,
          position: "middle"
        }).present();
      }
    });
  }

  searchBooks(title: String, author: String) {
    this.navCtrl.push('SearchPage', {'title': title, 'author': author});
  }

}
