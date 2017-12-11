import { Component } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireAuth } from 'angularfire2/auth';
import { StorageProvider } from '../providers/storage/storage';
import { TabsPage } from '../pages/tabs/tabs';
import {HomePage} from '../pages/home/home';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any;
  homePage = HomePage;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              angularFireAuth: AngularFireAuth,
              private storageProvider: StorageProvider,
              private menuCtrl: MenuController) {
    platform.ready().then(() => {


      statusBar.styleDefault();
      splashScreen.hide();
    });

    const authObserver = angularFireAuth.authState.subscribe(user => {
      if (user) {
        this.storageProvider.userId = user.uid;
        this.rootPage = TabsPage;
        authObserver.unsubscribe();
      } else {
        this.rootPage = 'LoginPage';
        authObserver.unsubscribe();
      }
    });

  }

  openPage(page: any) {
    this.rootPage = page;
    this.menuCtrl.close();
  }

  closeMenu() {
    this.menuCtrl.close();
  }

}

