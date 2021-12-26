import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginSuccessGuard } from './guard/login-success.guard';
import { LoginguardGuard } from './guard/loginguard.guard';
import { ListPatientComponent } from './list-patient/list-patient.component';
import { PatientDetailComponent } from './list-patient/patient-detail/patient-detail.component';
import { LoginComponent } from './login/login.component';
import { MapComponent } from './map/map.component';
import { RegionComponent } from './region/region.component';
import { EmergencyComponent } from './test/emergency/emergency.component';
import { TestComponent } from './test/test.component';
import { TotalComponent } from './total/total.component';

const routes: Routes = [
  { path: 'world', component: TotalComponent },
  {path:"",redirectTo:"world",pathMatch:"full"},
  { path: 'region', component: RegionComponent},
  { path: 'map', component: MapComponent},
  { path: 'test', component: TestComponent},
  {path:'emergency',component:EmergencyComponent},
  { path: 'login', component: LoginComponent, canActivate: [LoginguardGuard]},
  {path:'list-patient', component:ListPatientComponent,children:[
    { path: ':id', component: PatientDetailComponent, canActivate: [LoginSuccessGuard]}
  ],canActivate:[LoginSuccessGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
