import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';
import { BooksDataProvider } from '../providers/books-data/books-data';
import { HttpClientModule } from '@angular/common/http';

//plugins
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { IonicStorageModule } from '@ionic/storage';

//firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { MessagesProvider } from '../providers/messages/messages';
import { StorageProvider } from '../providers/storage/storage';

export const firebaseConfig = {
  apiKey: "AIzaSyAr2rBFMRaNmrN6VTF_JzQpT4kLX_OZiG4",
  authDomain: "bookscollection-186811.firebaseapp.com",
  databaseURL: "https://bookscollection-186811.firebaseio.com",
  projectId: "bookscollection-186811",
  storageBucket: "bookscollection-186811.appspot.com",
  messagingSenderId: "175527127132"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BooksDataProvider,
    BarcodeScanner,
    AngularFireDatabase,
    AuthenticationProvider,
    MessagesProvider,
    StorageProvider
  ]
})
export class AppModule {
}
