import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { EmailValidator } from '../../validators/email';

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {

  resetPasswordForm: FormGroup;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private authenticationProvider: AuthenticationProvider,
              private formBuilder: FormBuilder,
              private alertCtrl: AlertController) {

    this.resetPasswordForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])]
    });
  }


  resetPassword() {
    if (!this.resetPasswordForm.valid) {
      //TODO mostrar error
      console.log(this.resetPasswordForm.value);
    } else {
      this.authenticationProvider.resetPassword(this.resetPasswordForm.value.email).then(user => {
        this.alertCtrl.create({
          message: "Se ha enviado un correo para resetear el password de la cuenta",
          buttons: [
            {
              text: "Ok",
              role: "cancel",
              handler: () => {
                this.navCtrl.pop();
              }
            }
          ]
        }).present();
      }, error => {
        this.alertCtrl.create({
          message: error.message,
          buttons: [
            {
              text: "Ok",
              role: "cancel"
            }
          ]
        }).present();
      });
    }
  }


}
