import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TotalComponent } from './total/total.component';
import { RegionComponent } from './region/region.component';
import { HeaderComponent } from './header/header.component';
import{ HttpClientModule} from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapComponent } from './map/map.component';
import { TestComponent } from './test/test.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartRegionComponent } from './region/chart-region/chart-region.component';
import { ChartComponent } from './total/chart/chart.component';
import { EmergencyComponent } from './test/emergency/emergency.component';
import { MatSliderModule } from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { LoginComponent } from './login/login.component';
import { HorizonChartComponent } from './total/horizon-chart/horizon-chart.component';
import { ListPatientComponent } from './list-patient/list-patient.component';
import { PatientDetailComponent } from './list-patient/patient-detail/patient-detail.component';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [
    AppComponent,
    TotalComponent,
    RegionComponent,
    HeaderComponent,
    ChartComponent,
    FooterComponent,
    MapComponent,
    TestComponent,
    ChartRegionComponent,
    EmergencyComponent,
    LoginComponent,
    HorizonChartComponent,
    ListPatientComponent,
    PatientDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    FormsModule,
    LeafletModule,
    ReactiveFormsModule,
    MatButtonModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
