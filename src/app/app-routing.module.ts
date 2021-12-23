import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
import { RegionComponent } from './region/region.component';
import { EmergencyComponent } from './test/emergency/emergency.component';
import { TestComponent } from './test/test.component';
import { TotalComponent } from './total/total.component';

const routes: Routes = [
  { path: 'world', component: TotalComponent },
  { path: 'region', component: RegionComponent},
  { path: 'map', component: MapComponent},
  { path: 'test', component: TestComponent},
  {path:'emergency',component:EmergencyComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
