import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private http : HttpClient) {}

  public $tripSource = new Subject<any>();


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

  setTrip(trip): void {
    this.$tripSource.next(trip);
    (<any>window).trip = trip;
  }


}
