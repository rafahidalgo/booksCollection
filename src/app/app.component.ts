import { Component } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireAuth } from 'angularfire2/auth';
import { StorageProvider } from '../providers/storage/storage';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { BooksDataProvider } from '../providers/books-data/books-data';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              angularFireAuth: AngularFireAuth,
              private storageProvider: StorageProvider,
              private menuCtrl: MenuController,
              public authenticationProvider: AuthenticationProvider,
              private booksDataProvider: BooksDataProvider) {
    platform.ready().then(() => {


      statusBar.styleDefault();
      splashScreen.hide();
    });

    const authObserver = angularFireAuth.authState.subscribe(user => {
      if (user) {
        this.storageProvider.userId = user.uid;
        this.authenticationProvider.logged = true;
        this.authenticationProvider.email = user.email;
        this.rootPage = 'TabsPage';
        authObserver.unsubscribe();
      } else {
        this.storageProvider.userId = "0"; //Usuario invitado
        this.authenticationProvider.logged = false;
        this.authenticationProvider.email = "Invitado";
        this.rootPage = 'TabsPage';
        authObserver.unsubscribe();
      }
    });

  }

  openPage(page: any) {
    this.rootPage = page;
    this.menuCtrl.close();
  }

  logout() {
    this.authenticationProvider.logout().then(() => {
      this.storageProvider.userId = "0";
      this.storageProvider.getCollection();
      this.authenticationProvider.logged = false;
      this.authenticationProvider.email = "Invitado";
      this.storageProvider.loadLocalStorage();      //Desde LocalStorage
      this.booksDataProvider.sort(this.booksDataProvider.sortingMode);
      this.openPage('TabsPage');
    });
  }


}

