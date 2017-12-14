import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../../models/book.model';
import { Observable } from 'rxjs/Observable';
import { ActionSheetController } from 'ionic-angular';

@Injectable()
export class BooksDataProvider {

  booksFirebase: any[] = [];
  booksCollection: Book[] = [];
  sortingMode: string = "titleAsc"; //Ordenado por defecto por título ascendente

  constructor(private http: HttpClient,
              private actionSheetCtrl: ActionSheetController) {

  }

  getBooks(title: String, author: String, isbn: String): Observable<any> {
    if (title && author && !isbn) {
      return this.http.get(`https://www.googleapis.com/books/v1/volumes?q="${title}"+inauthor:${author}&key=AIzaSyC4bVaIsHrFcf01d0daPuYH9MYx2jZpfLQ`);
    } else if (title && !author && !isbn) {
      return this.http.get(`https://www.googleapis.com/books/v1/volumes?q="${title}"&key=AIzaSyC4bVaIsHrFcf01d0daPuYH9MYx2jZpfLQ`);
    } else if (!title && author && !isbn) {
      return this.http.get(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${author}&key=AIzaSyC4bVaIsHrFcf01d0daPuYH9MYx2jZpfLQ`);
    } else if (!title && !author && isbn) {
      return this.http.get(`https://www.googleapis.com/books/v1/volumes?q=ISBN${isbn}&key=AIzaSyC4bVaIsHrFcf01d0daPuYH9MYx2jZpfLQ`);
    }

  }

  sortByTitleAsc(a, b) {
    if (a.volumeInfo.title < b.volumeInfo.title) {
      return -1;
    }
    if (a.volumeInfo.title > b.volumeInfo.title) {
      return 1;
    }
    if (a.volumeInfo.title = b.volumeInfo.title) {
      return 0;
    }
  }

  sortByTitleDesc(a, b) {
    if (a.volumeInfo.title < b.volumeInfo.title) {
      return 1;
    }
    if (a.volumeInfo.title > b.volumeInfo.title) {
      return -1;
    }
    if (a.volumeInfo.title = b.volumeInfo.title) {
      return 0;
    }
  }

  sortByPublishedDateAsc(a, b) {
    if (a.volumeInfo.publishedDate < b.volumeInfo.publishedDate) {
      return -1;
    }
    if (a.volumeInfo.publishedDate > b.volumeInfo.publishedDate) {
      return 1;
    }
    if (a.volumeInfo.publishedDate = b.volumeInfo.publishedDate) {
      return 0;
    }
  }

  sortByPublishedDateDesc(a, b) {
    if (a.volumeInfo.publishedDate < b.volumeInfo.publishedDate) {
      return 1;
    }
    if (a.volumeInfo.publishedDate > b.volumeInfo.publishedDate) {
      return -1;
    }
    if (a.volumeInfo.publishedDate = b.volumeInfo.publishedDate) {
      return 0;
    }
  }


  sort(mode: string) { //Lo implemento a parte por si se quiere usar en algo que no sea un ActionSheet

    switch (mode) {
      case "titleAsc":
        this.booksCollection.sort(this.sortByTitleAsc);
        break;
      case "titleDesc":
        this.booksCollection.sort(this.sortByTitleDesc);
        break;
      case "publisherDateAsc":
        this.booksCollection.sort(this.sortByPublishedDateAsc);
        break;
      case "publisherDateDesc":
        this.booksCollection.sort(this.sortByPublishedDateDesc);
        break;
    }

  }

  presentActionSheet() {
    this.actionSheetCtrl.create({
      title: 'Ordenar por:',
      buttons: [
        {
          icon: 'arrow-up',
          text: 'Título (ascendente)',
          handler: () => {
            this.sortingMode = "titleAsc";
            this.sort(this.sortingMode);
          }
        },
        {
          icon: 'arrow-down',
          text: 'Título (descendente)',
          handler: () => {
            this.sortingMode = "titleDesc";
            this.sort(this.sortingMode);
          }
        },
        {
          icon: 'arrow-up',
          text: 'Fecha de publicación (ascendente)',
          handler: () => {
            this.sortingMode = "publisherDateAsc";
            this.sort(this.sortingMode);
          }
        },
        {
          icon: 'arrow-down',
          text: 'Fecha de publicación (descendente)',
          handler: () => {
            this.sortingMode = "publisherDateDesc";
            this.sort(this.sortingMode);
          }
        },
        {
          icon: 'close',
          text: 'Cancel',
          role: 'cancel',
        }
      ]
    }).present();
  }

}
