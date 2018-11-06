import { Component, OnInit , ChangeDetectionStrategy , Input } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import {TripService} from '../trip.service';
import { ActivatedRoute } from '@angular/router';
import { icon, latLng, Layer, marker, tileLayer } from 'leaflet';
import { Observable } from "rxjs/Rx"
import { Http, Response } from "@angular/http"
import { webSocket } from 'rxjs/webSocket' // for RxJS 6, for v5 use Observable.webSocket

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DetailsComponent implements OnInit {

  //  subject.next(JSON.stringify({ op: 'hello' }));

  trip = {name:"",createdAt:""} //, startLat:"", startLong:"",owner:"" 

  ANCHOR_URI='assets/anchor.png';
  LAYER_OSM = tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' });
  options= {
    layers: [ this.LAYER_OSM ],
    zoom: 10,
    center: latLng(53.270962, -9.062691)
  }

  public markers//: Layer[]

  constructor(private route: ActivatedRoute, private tripService: TripService) {   }


  ngOnInit() {
    this.getTrip(this.route.snapshot.params['id']);

    let subject = webSocket('ws://localhost:8081');
    subject.subscribe(
      (msg) => {
        console.info('message received:', msg);
        this.fetchMarkers();
      },
      (err) => console.log(err),
      () => console.log('complete')  
      );  
      
      this.fetchMarkers();
  }


  fetchMarkers(){
    var test: Layer[] = [];
    console.info('fectching');
    this.tripService.getWayPoints().subscribe( res  => {
      console.log(res);
      res.forEach(wp => {
        var marker = this.createMarker("53.270962", "-9.062691");      
        test.push(marker);
      });      
      this.markers = test;    
    });

  }

/**
 * Add a Leaflet Icon to the  markers array
 **/
  createMarker(lat,lon) {
    console.log("Create New Marker");
  const newMarker = marker(
      [ lat , lon  ],
      {
        icon: icon({
          iconSize: [ 16, 16 ],
          iconUrl: this.ANCHOR_URI,
        })
      }
      );
      return newMarker;
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
