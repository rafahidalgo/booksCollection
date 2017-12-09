import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, Loading, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { EmailValidator } from '../../validators/email';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  registerForm: FormGroup;
  loading: Loading;

  constructor(public navCtrl: NavController,
              private authenticationProvider: AuthenticationProvider,
              private formBuilder: FormBuilder,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {

    this.registerForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });

  }

  register() {
    if (!this.registerForm.valid) {
      //TODO mostrar error
      console.log(this.registerForm.value);
    } else {
      this.authenticationProvider.register(this.registerForm.value.email, this.registerForm.value.password)
        .then(() => {
          this.navCtrl.setRoot(HomePage);
        }), error => {
        this.loading.dismiss().then(() => {
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
      };
      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true
      });
      this.loading.present();
    }
  }

}
