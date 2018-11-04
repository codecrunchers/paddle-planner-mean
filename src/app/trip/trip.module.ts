import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CreateComponent } from './create/create.component';
import { DetailsComponent } from './details/details.component'
import { TripRoutingModule } from './trip-routing.module';
import { TripService } from './trip.service';
import { TripComponent } from './trip.component';


@NgModule({
  imports: [
  CommonModule,
    SharedModule,
    TripRoutingModule,
  ],
  declarations: [ CreateComponent, DetailsComponent, TripComponent],
  providers: [
    TripService
  ]


})
export class TripModule { }
