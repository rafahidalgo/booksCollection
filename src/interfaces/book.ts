export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors: [string];
    publisher: string;
    publishedDate: string;
    description: string;
    industryIdentifiers: [{
      type: string;
      identifier: string;
    }];
    pageCount: number;
    categories: [string];
    averageRating: number;
    ratingsCount: number;
    maturityRating: string;
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    }
    languaje: string;
    previewLink: string;
    infoLink: string;
  }
}
