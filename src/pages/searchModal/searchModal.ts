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
  isbn: Number;

  constructor(private viewCtrl: ViewController,
              private barcodeScanner: BarcodeScanner,
              private toastCtrl: ToastController) {
  }

  toSearchPage() {
    this.viewCtrl.dismiss({title: this.title, author: this.author, isbn: this.isbn});
  }

  scanData() {
    this.barcodeScanner.scan().then((barcodeData) => {
      if (barcodeData.format == "EAN_13" && (barcodeData.text.startsWith("978") || barcodeData.text.startsWith("979"))) {
        this.isbn = parseInt(barcodeData.text);
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
