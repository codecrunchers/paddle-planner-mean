import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';
import { HomeComponent } from '../home/home.component';
import { TripComponent } from '../trip/trip.component';
import { TripCreateComponent } from '../trip-create/trip-create.component';
import { TripDetailComponent } from '../trip-detail/trip-detail.component';

const routes: Routes = [
{
  path: '',
  component: HomeComponent
}, {
  path: 'auth',
  loadChildren: 'app/auth/auth.module#AuthModule'
}, {
  path: 'admin',
  loadChildren: 'app/admin/admin.module#AdminModule'
  },
  {
    path: 'trips',
    component: TripComponent,
    data: { title: 'Trip List' }
  },
  {
    path: 'trip-details/:id',
    component: TripDetailComponent,
    data: { title: 'Trip Details' }
  },
  {
    path: 'trip-create',
    component: TripCreateComponent,
    data: { title: 'Create Trip' }
  },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
  declarations: []
})

export class AppRoutingModule {}
