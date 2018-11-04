import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import {TripService} from '../trip.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  trip = {}
  constructor(private route: ActivatedRoute, private tripService: TripService) { }

  ngOnInit() {
    this.getTrip(this.route.snapshot.params['id']);
  }

  getTrip(id :string){
    this.tripService.getTrip(id)
      .subscribe(data => {
        this.trip = data
      })
  }

  deleteTrip(id :string){
    console.log("TODO")
  }

}
