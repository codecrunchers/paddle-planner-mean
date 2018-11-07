import {Injectable} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private http : HttpClient) {}

  public $tripSource = new Subject<any>();

    getTrips(): Observable<any> {
      return this.http.get('/api/trip', httpOptions).pipe(
       map(this.extractData),
        catchError(this.handleError));
  }

  getWayPoints(queryParams): Observable<any> {
    return this.http.get(`/api/waypoint/${queryParams}`, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  create(name : string) : Observable<any> {
    return Observable.create(observer => {
      this.http.post('/api/trip/create', {
        name,
      }).subscribe((data : any) => {
        observer.next({trip: data.trip});
        this.setTrip(data.trip);
        observer.complete();
      })
    });
  }


  getTrip(id :string): Observable<any> {
    const url = `/api/trip/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  setTrip(trip): void {
    this.$tripSource.next(trip);
    (<any>window).trip = trip;
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
    return throwError('Something bad happened; please try again later.');
  };

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }


}
