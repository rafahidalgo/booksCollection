import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireAuth } from 'angularfire2/auth';
import { StorageProvider } from '../providers/storage/storage';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              angularFireAuth: AngularFireAuth,
              private storageProvider: StorageProvider) {
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
}

