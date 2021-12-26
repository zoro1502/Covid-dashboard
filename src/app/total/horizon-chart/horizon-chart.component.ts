import { CovidService } from 'src/services/covid.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-horizon-chart',
  templateUrl: './horizon-chart.component.html',
  styleUrls: ['./horizon-chart.component.css'],
})
export class HorizonChartComponent implements OnInit {
  single: any = [];
  // single: any = [];
  view: any={};

  total: any =[];
  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Country';
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'People';

  colorScheme: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };

  constructor(private service: CovidService) {
    // this.view = [innerWidth / 1, 285];
  }

  ngOnInit(): void {
    this.service.getTotal().subscribe((response: any) => {
      let keys = Object.keys(response);
      let values = Object.values(response);
      for (let i = 0; i < keys.length; i++) {
        let item = { name: keys[i], value: values[i] };
        this.total.push(item);
        this.single = this.total;
      }
    });
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
