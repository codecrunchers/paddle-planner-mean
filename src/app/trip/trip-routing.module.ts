import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DetailsComponent} from './details/details.component';
import {CreateComponent} from './create/create.component';
import {TripComponent} from './trip.component';



const routes: Routes = [{
    path: 'trip',
    children: [{
    path: '',
    component: TripComponent
  }, {
    path: 'create',
    component: CreateComponent
  }, {
     path: 'details',
    component: DetailsComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TripRoutingModule { }

