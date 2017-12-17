import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, Loading } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { EmailValidator } from '../../validators/email';
import { MessagesProvider } from '../../providers/messages/messages';
import { StorageProvider } from '../../providers/storage/storage';


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
              private messagesProvider: MessagesProvider,
              private storageProvider: StorageProvider) {

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
        .then((authenticationData) => {
          this.storageProvider.userId = authenticationData.uid;
          this.authenticationProvider.logged = true;
          this.authenticationProvider.email = authenticationData.email;
          this.navCtrl.setRoot('TabsPage');
        }, error => {
          this.loading.dismiss().then(() => {
            this.messagesProvider.createBasicAlert(error.message);
          });
        });
      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true
      });
      this.loading.present();
    }
  }

}
