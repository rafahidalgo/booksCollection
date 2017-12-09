import { Injectable } from '@angular/core';
import { ToastController, AlertController } from 'ionic-angular';


@Injectable()
export class MessagesProvider {

  constructor(private  toastCtrl: ToastController,
              private alertCtrl: AlertController) {
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


}
