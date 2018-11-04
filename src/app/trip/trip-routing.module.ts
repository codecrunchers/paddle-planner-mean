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
    component: CreateComponent,
    data: { title: 'Create Trip' }
  }, {
    path: 'details/:id',
    component: DetailsComponent,
    data: { title: 'Trip Details' }
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TripRoutingModule { }

