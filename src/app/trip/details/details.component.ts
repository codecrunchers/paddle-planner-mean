import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import {TripService} from '../trip.service';
import { ActivatedRoute } from '@angular/router';
import { icon, latLng, Layer, marker, tileLayer } from 'leaflet';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  trip = {name:"",createdAt:""}
  options= {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 ,     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>' })
	],
    zoom: 10,
    center: latLng(53.270962, -9.062691)
  }

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
