import { Component } from '@angular/core';
import { IonicPage, NavController, Loading, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { HomePage } from '../home/home';
import { EmailValidator } from '../../validators/email';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { RegisterPage } from '../register/register';
import { MessagesProvider } from '../../providers/messages/messages';
import { StorageProvider } from '../../providers/storage/storage';
import { TabsPage } from '../tabs/tabs';


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
              private messagesProvider: MessagesProvider,
              private storageProvider: StorageProvider) {

    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });

  }

  ionViewDidEnter(){
    this.authenticationProvider.actualPage = "LoginPage";
  }

  login() {
    if (!this.loginForm.valid) {
      //TODO mostrar error
    } else {
      this.authenticationProvider.login(this.loginForm.value.email, this.loginForm.value.password)
        .then(authenticationData => {
          this.storageProvider.userId = authenticationData.uid;
          this.authenticationProvider.logged = true;
          this.navCtrl.setRoot(TabsPage);
        }, error => {
          this.loading.dismiss().then(() => {
            this.messagesProvider.createBasicAlert("No hay ningún usuario con esa dirección de correo");
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
