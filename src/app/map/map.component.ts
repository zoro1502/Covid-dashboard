import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CovidService } from 'src/services/covid.service';
import * as L from 'leaflet';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {

  map: any;
  circle: any;
  listCountry: any;

  constructor(private covidService: CovidService) {}

  initMap(): void {
    this.map = L.map('map', {
      center: [41.40338, 2.17403],
      zoom: 5,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 2,
        attribution: 'Covid map',
        noWrap:true,
      }
    );

    tiles.addTo(this.map);

    this.covidService.getListCase().subscribe((response) => {
      this.listCountry = response;
      console.log(this.listCountry);
      for (const country of this.listCountry) {
        if (country.confirmed <= 100000) {
          this.circle = L.circle([country.location.lat, country.location.lng], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.2,
            radius: 80000,
          }).addTo(this.map);
        } else if (country.confirmed > 100000 && country.confirmed < 500000) {
          this.circle = L.circle([country.location.lat, country.location.lng], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.4,
            radius: 100000,
          }).addTo(this.map);
        } else {
          this.circle = L.circle([country.location.lat, country.location.lng], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.6,
            radius: 140000,
          }).addTo(this.map);
        }
        this.circle.on('mouseover', (e:any) => {
          //open popup;
           L.popup()
           .setLatLng(e.latlng)
           .setContent('<b>Country</b>: '+country.countryregion + '<br>'+
                       '<b>Confirmed</b>: ' +country.confirmed + '<br>'+
                       '<b>Deaths</b>: ' +country.deaths + '<br>'+
                       '<b>Recovered</b>: ' +country.recovered)
           .openOn(this.map);
        });
        this.circle.on('mouseout', (e:any) => {
          this.map.closePopup();
        });
      }
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
  }
}
