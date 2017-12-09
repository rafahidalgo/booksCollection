import { Component } from '@angular/core';
import { IonicPage, NavController, Loading, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { HomePage } from '../home/home';
import { EmailValidator } from '../../validators/email';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { RegisterPage } from '../register/register';
import {MessagesProvider} from '../../providers/messages/messages';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm: FormGroup;
  public loading: Loading;

  constructor(public navCtrl: NavController,
              private loadingCtrl: LoadingController,
              private formBuilder: FormBuilder,
              private authenticationProvider: AuthenticationProvider,
              private messagesProvider: MessagesProvider) {

    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });

  }

  login() {
    if (!this.loginForm.valid) {
      //TODO mostrar error
      console.log(this.loginForm.value);
    } else {
      this.authenticationProvider.login(this.loginForm.value.email, this.loginForm.value.password).then(authenticationData => {
        this.navCtrl.setRoot(HomePage);
      }, error => {
        this.loading.dismiss().then(() => {
          this.messagesProvider.createBasicAlert("No hay ningún usuario con esas dirección de correo");
        });
      });
      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }

  goToResetPassword() {
    this.navCtrl.push('ResetPasswordPage');
  }

  goToRegister() {
    this.navCtrl.push('RegisterPage');
  }


}
