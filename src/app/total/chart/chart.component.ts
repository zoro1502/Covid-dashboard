import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CovidService } from 'src/services/covid.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  providers: [DatePipe],
})
export class ChartComponent implements OnInit {
  total: Total = { confirmed: 0, deaths: 0, recovered: 0 };
  deathRate!: number;
  myDate: any = new Date();
  arr: any = ['1/22/20', '6/30/20', '12/31/20', '6/30/21', '12/19/21'];

  confirm!: any;
  multi = [
    {
      name: 'Confirmed',
      series: [],
    },
    {
      name: 'Deaths',
      series: [],
    },
    {
      name: 'Recovered',
      series: [],
    },
  ];
  single: any = [];

  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;
  autoScale: boolean = true;
  yScaleMin: number = 0;
  gradient: boolean = true;

  colorScheme: any = {
    domain: ['blue', 'red', 'green'],
  };

  constructor(private service: CovidService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.myDate.setDate(this.myDate.getDate() - 2);
    this.myDate = this.datePipe.transform(this.myDate, 'MM/dd/yy');
    this.service.getTotal().subscribe((response: any) => {
      this.total = response;
      this.deathRate =
        Math.round((this.total.deaths / this.total.confirmed) * 100 * 100) /
        100;
    });

    this.service.getTimes().subscribe((res: any) => {
      //  console.log(res)
      this.confirm = res.map((item: any) => {
        return item.timeseries;
      });
      this.multi[0].series = this.service.getDayInTheWorld(
        this.arr,
        this.confirm,
        this.multi[0].name
      );
      this.multi[1].series = this.service.getDayInTheWorld(
        this.arr,
        this.confirm,
        this.multi[1].name
      );
      this.multi[2].series = this.service.getDayInTheWorld(
        this.arr,
        this.confirm,
        this.multi[2].name
      );
      this.single = this.multi;
    });
  }
}
