import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BooksDataProvider } from '../providers/books-data/books-data';
import { HttpClientModule } from '@angular/common/http';

//plugins
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

//firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

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
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BooksDataProvider,
    BarcodeScanner,
    AngularFireDatabase
  ]
})
export class AppModule {
}
