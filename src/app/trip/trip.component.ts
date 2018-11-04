import { Component, OnInit } from '@angular/core';
import {TripService} from './trip.service';
import { Router } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit {

  trips: any;
  displayedColumns = ['name'];
  dataSource = new TripDataSource(this.tripService);
  constructor(private tripService: TripService, private router: Router) { }


  ngOnInit() {
    this.tripService.getTrips()
      .subscribe(res => {
        this.trips = res;
      }, err => {
        console.log(err);
      });
  }

}

export class TripDataSource extends DataSource<any> {
  constructor(private api: TripService) {
    super()
  }

  connect() {
    return this.api.getTrips();
  }

  disconnect() {

  }
}


