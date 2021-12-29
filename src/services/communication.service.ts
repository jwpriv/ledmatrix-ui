import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Pixel } from 'src/model/pixel';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private apiUrl = 'http://raspimatrix:3000';

  constructor(private http: HttpClient) { }

  setPixel(pxl: Pixel) {
    return this.http.post(`${this.apiUrl}/pixel`, pxl).pipe(catchError(this.handleError));
  }

  clear() {
    return this.http.post(`${this.apiUrl}/clear`, null).pipe(catchError(this.handleError));
  }

  // basic error handling
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }

    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
