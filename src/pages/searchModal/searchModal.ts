import { Component } from '@angular/core';
import { IonicPage, ViewController, LoadingController, Loading } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { MessagesProvider } from '../../providers/messages/messages';
import { AuthenticationProvider } from '../../providers/authentication/authentication';


@IonicPage()
@Component({
  selector: 'page-search-modal',
  templateUrl: 'searchModal.html',
})
export class SearchModalPage {

  title: String;
  author: String;
  isbn: String = "";

  constructor(private viewCtrl: ViewController,
              private barcodeScanner: BarcodeScanner,
              private messagesProvider: MessagesProvider,
              private loadingCtrl: LoadingController,
              private authenticationProvider: AuthenticationProvider) {
  }

  ionViewDidEnter() {
    this.authenticationProvider.actualPage = "SearchModalTab";
  }

  toSearchPage() {

    //Si están todos los campos vacíos
    if (!this.isbn && !this.author && !this.title) {
      this.messagesProvider.createBasicAlert("Por favor, introduce algún criterio de búsqueda");
      return;
    }

    if (this.isbn.length > 0) {
      if (this.isbn.length == 13 && (this.isbn.startsWith("978") || this.isbn.startsWith("979"))) {
        this.viewCtrl.dismiss({title: this.title, author: this.author, isbn: this.isbn});
        this.messagesProvider.loading = this.loadingCtrl.create({
          content: "Por favor, espere..."
        });
        this.messagesProvider.loading.present();
      } else {
        this.messagesProvider.createBasicAlert("No es un códio ISBN válido");
      }
    } else {
      this.viewCtrl.dismiss({title: this.title, author: this.author, isbn: this.isbn});
      this.messagesProvider.loading = this.loadingCtrl.create({
        content: "Por favor, espere..."
      });
      this.messagesProvider.loading.present();
    }

  }

  scanData() {
    this.barcodeScanner.scan().then((barcodeData) => {
      if (barcodeData.format == "EAN_13" && (barcodeData.text.startsWith("978") || barcodeData.text.startsWith("979"))) {
        this.isbn = barcodeData.text;
        this.toSearchPage();
      } else {
        this.messagesProvider.createBasicAlert("No es un libro");
      }
      //TODO hay que identificar libros con isbn de 10 dígitos
      //TODO desactivar entradas de titulo y autor si se busca por isbn
    }, (err) => {
      this.messagesProvider.createBasicAlert(`Error: ${err}`);
    });
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

}
