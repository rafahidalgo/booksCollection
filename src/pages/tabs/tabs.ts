import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

//providers
import { StorageProvider } from '../../providers/storage/storage';


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1: any;
  tab2: any;

  constructor(public storageProvider: StorageProvider) {
    this.tab1 = 'HomePage';
    this.tab2 = "CoverPage";
    this.storageProvider.loadLastTab();
  }

}
