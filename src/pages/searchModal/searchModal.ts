import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ToastController } from 'ionic-angular';

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
              private toastCtrl: ToastController) {
  }

  toSearchPage() {
    if (this.isbn.length > 0) {
      if (this.isbn.length == 13 && (this.isbn.startsWith("978") || this.isbn.startsWith("979"))) {
        this.viewCtrl.dismiss({title: this.title, author: this.author, isbn: this.isbn});
      } else {
        this.mostrarError("No es un código ISBN válido");
      }
    } else {
      this.viewCtrl.dismiss({title: this.title, author: this.author, isbn: this.isbn});
    }
  }

  scanData() {
    this.barcodeScanner.scan().then((barcodeData) => {
      if (barcodeData.format == "EAN_13" && (barcodeData.text.startsWith("978") || barcodeData.text.startsWith("979"))) {
        this.isbn = barcodeData.text;
        this.toSearchPage();
      } else {
        this.mostrarError("No es un libro");
      }
      //TODO hay que identificar libros con isbn de 10 dígitos
      //TODO desactivar entradas de titulo y autor si se busca por isbn
    }, (err) => {
      this.mostrarError("Error:" + err);
    });
  }


  //TODO cambiar a mostrarMensaje y cambiarlo al provider para usarlo para todos los toasts
  mostrarError(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 1500,
      position: "middle"
    }).present();
  }

  cancel() {
    this.viewCtrl.dismiss();
  }


}
