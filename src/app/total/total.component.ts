import { Component, OnInit } from '@angular/core';
import { CovidService } from 'src/services/covid.service';

@Component({
  selector: 'app-total',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.css'],
})
export class TotalComponent implements OnInit {
  total: Total = { confirmed: 0, deaths: 0, recovered: 0 };
  deathRate!: number;
  constructor(private service: CovidService) {}

  ngOnInit(): void {
    this.service.getTotal().subscribe((response: any) => {
      this.total = response;
      this.deathRate =
        Math.round((this.total.deaths / this.total.confirmed) * 100 * 100) /
        100;
    });
  }
}
