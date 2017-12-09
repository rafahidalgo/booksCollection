import { Injectable } from '@angular/core';
import { ToastController, AlertController, LoadingController } from 'ionic-angular';


@Injectable()
export class MessagesProvider {

  constructor(private  toastCtrl: ToastController,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController) {
  }

  createToast(message: string, duration: number, position: string) {
    this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position
    }).present();
  }

  createBasicAlert(message: string) {
    this.alertCtrl.create({
      message: message,
      buttons: [
        {
          text: "Ok",
          role: "cancel"
        }
      ]
    }).present();
  }

  createLoading() {
    this.loadingCtrl.create({
      dismissOnPageChange: true,
      content: "Por favor, espere..."
    }).present();
  }


}
