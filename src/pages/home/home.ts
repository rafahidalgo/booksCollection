import { Component } from '@angular/core';
import { ModalController, ToastController, NavController } from 'ionic-angular';

//Interfaces
import { Book } from '../../interfaces/book';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  booksCollection: Book[] = [];
  searchedTitle: string;
  searchebAuthor: string;

  constructor(private modalCtrl: ModalController,
              private toastCtrl: ToastController,
              private navCtrl: NavController) {
  }

  searchModal() {
    let modal = this.modalCtrl.create('SearchModalPage');
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        this.searchedTitle = data.title;
        this.searchebAuthor = data.author;
        this.searchBooks(this.searchedTitle, this.searchebAuthor);
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
