import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-search-modal',
  templateUrl: 'search-modal.html',
})
export class SearchModalPage {

  title: string;
  author: string;

  constructor(public viewCtrl: ViewController,
              public navParams: NavParams) {
  }

  back() {
    this.viewCtrl.dismiss({title: this.title, author: this.author});
  }

  cancel() {
    this.viewCtrl.dismiss();
  }


}
