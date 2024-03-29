import { Injectable } from '@angular/core';
import { ToastController, AlertController, Loading } from 'ionic-angular';


@Injectable()
export class MessagesProvider {

  loading: Loading;

  constructor(private  toastCtrl: ToastController,
              private alertCtrl: AlertController) {
  }

  //Toast
  createToast(message: string, duration: number, position: string) {
    this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position
    }).present();
  }

  //Alert
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

}
