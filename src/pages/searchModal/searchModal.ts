import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-search-modal',
  templateUrl: 'searchModal.html',
})
export class SearchModalPage {

  title: string;
  author: string;

  constructor(public viewCtrl: ViewController) {
  }

  toSearchPage() {
    this.viewCtrl.dismiss({title: this.title, author: this.author});
  }

  cancel() {
    this.viewCtrl.dismiss();
  }


}
