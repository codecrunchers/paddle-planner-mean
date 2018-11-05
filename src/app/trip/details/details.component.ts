import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import {TripService} from '../trip.service';
import { ActivatedRoute } from '@angular/router';
import { icon, latLng, Layer, marker, tileLayer } from 'leaflet';
import { Observable } from "rxjs/Rx"

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  trip = {name:"",createdAt:""} //, startLat:"", startLong:"",owner:"" 

  LAYER_OSM = tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' });
  options= {
    layers: [ this.LAYER_OSM ],
    zoom: 10,
    center: latLng(53.270962, -9.062691)
  }

  public markers$ : Layer[] = []

  constructor(private route: ActivatedRoute, private tripService: TripService) { }

  ngOnInit() {
    this.getTrip(this.route.snapshot.params['id']);

    this.tripService.getWayPoints()
      .subscribe((markers : Layer[])  => {
        markers.map((singleMarker) => {
          this.addMarker(singleMarker.lat, singleMarker.lon)
          return this.markers$;
        });
      });
  }


  addMarker(lat,lon) {
    const newMarker = marker(
      [ lat , lon  ],
      {
        icon: icon({
          iconSize: [ 25, 41 ],
          iconAnchor: [ 13, 41 ],
          iconUrl: '/anchor.png',
        })
      }
    );

    this.markers$.push(newMarker);
  }

  removeLastMarker() {
    this.markers$.pop();
  }

  getMarkers(){
    return this.markers$;
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
