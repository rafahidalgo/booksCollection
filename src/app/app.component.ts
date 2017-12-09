import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import { StorageProvider } from '../providers/storage/storage';
import { BooksDataProvider } from '../providers/books-data/books-data';
import { AuthenticationProvider } from '../providers/authentication/authentication';

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
              private booksDataProvider: BooksDataProvider,
              private authenticationProvider: AuthenticationProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    const authObserver = angularFireAuth.authState.subscribe(user => {
      if (user) {
        /*this.storageProvider.getUserData(user);
        this.storageProvider.books.subscribe(books => {
          this.booksDataProvider.booksCollection = books
        });
        console.log(this.booksDataProvider.booksCollection);*/
        this.storageProvider.userId = user.uid;
        this.rootPage = HomePage;
        authObserver.unsubscribe();
      } else {
        this.rootPage = 'LoginPage';
        authObserver.unsubscribe();
      }
    });

  }
}

