import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import {TripService} from '../trip.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {


  constructor(private tripService: TripService, private router: Router) { }


  ngOnInit() {
  }

  tripForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  getname(): any { return this.tripForm.get('name'); } 

  create() {

    if(!this.tripForm.valid) return;

    let {
      name,
    } = this.tripForm.getRawValue();

    this.tripService.create(name)
      .subscribe(data => {
        this.router.navigate(['trip']);
      })
  }

}
