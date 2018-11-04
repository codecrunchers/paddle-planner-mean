import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DetailsComponent} from './details/details.component';
import {CreateComponent} from './create/create.component';


const routes: Routes = [{
  path: 'trip',
  children: [{
    path: '',
    redirectTo: '/create',
    pathMatch: 'full'
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

