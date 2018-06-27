import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  get(url: string, data?: any) {
    let fetchUrl = '/api/' + url;
    if (typeof data === 'string') {
      fetchUrl = fetchUrl + data;
    } else if (typeof data === 'object') {
      fetchUrl = fetchUrl + '?' + this.objectToString(data);
    }
    return this.http.get(fetchUrl).pipe(
      tap(_ => console.log('get')),
      catchError(this.handleError)
    )
  }

  send(type: string, url: string, data?: any) {
    const fetchType = type.toLowerCase();
    let fetchUrl = '/api/' + url;
    if (typeof data === 'string') {
      fetchUrl = fetchUrl + data;
    } else if (typeof data === 'object') {
      fetchUrl = fetchUrl + '?' + this.objectToString(data);
    }
    return this.http[fetchType](fetchUrl).pipe(
      tap(_ => console.log(`http response, fetch type "${fetchType}".`)),
      catchError(this.handleError)
    )
  }

  private objectToString(obj: object) {
    let strArr = [];
    for (let key in obj) {
      strArr.push(key + '=' + encodeURIComponent(obj[key]));
    }
    return strArr.join('&');
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

}
