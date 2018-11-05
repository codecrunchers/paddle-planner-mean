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

  trip = {name:"",createdAt:""} //, startLat:"", startLong:"",owner:"" 

  LAYER_OSM = tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' });
  options= {
    layers: [ this.LAYER_OSM ],
    zoom: 10,
    center: latLng(53.270962, -9.062691)
  }

  //markers: Subject<any[]> = new BehaviorSubject<any[]>([]);
  markers: Layer[] = [];

  constructor(private route: ActivatedRoute, private tripService: TripService) { }

  ngOnInit() {
    this.getTrip(this.route.snapshot.params['id']);

    this.tripService.getWayPoints()
      .subscribe(markers => {
        //this.markers = markersList
        //var _markers = JSON.parse(markersList);

        var details = markers.map((singleMarker) => {
          return (
            this.addMarker(singleMarker.lat, singleMarker.lon)
          );
        });
        console.log(markers);
      });

  }



  addMarker(lat,lon) {
    const newMarker = marker(
      [ lat , lon  ],
      {
        icon: icon({
          iconSize: [ 25, 41 ],
          iconAnchor: [ 13, 41 ],
          iconUrl: '2273e3d8ad9264b7daa5bdbf8e6b47f8.png',
          shadowUrl: '44a526eed258222515aa21eaffd14a96.png' 
        })
      }
    );

    this.markers.push(newMarker);
  }

  removeMarker() {
    this.markers.pop();
  }

  getmarkers(){
    return this.markers;
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
