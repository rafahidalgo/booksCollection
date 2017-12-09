import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Book } from '../../models/book.model';
//import * as firebase from 'firebase'


@Injectable()
export class StorageProvider {

  userId: string;

  constructor(private angularFireDatabase: AngularFireDatabase) {
  }

  uploadBook(book: Book) {
    this.angularFireDatabase.object(`/users/${this.userId}/${book.id}`).update(book);
  }


}
