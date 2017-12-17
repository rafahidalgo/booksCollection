import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//validators
import { EmailValidator } from '../../validators/email';

//providers
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { MessagesProvider } from '../../providers/messages/messages';

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {

  resetPasswordForm: FormGroup;


  constructor(public navCtrl: NavController,
              private authenticationProvider: AuthenticationProvider,
              private formBuilder: FormBuilder,
              private messagesProvider: MessagesProvider,
              private alertCtrl: AlertController) {

    this.resetPasswordForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])]
    });
  }


  resetPassword() {
    if (!this.resetPasswordForm.valid) {
      this.messagesProvider.createBasicAlert("Introduce los datos correctamente");
    } else {
      this.authenticationProvider.resetPassword(this.resetPasswordForm.value.email).then(() => {
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
        this.messagesProvider.createBasicAlert(error.message);
      });
    }
  }


}
