import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CovidService } from 'src/services/covid.service';

@Component({
  selector: 'app-chart-region',
  templateUrl: './chart-region.component.html',
  styleUrls: ['./chart-region.component.css'],
  providers:[DatePipe]
})
export class ChartRegionComponent implements OnInit {

  @Input() infor: any
  @Input() time: any
  @Input() choice: any
  countryTimeseries!: any
  dateNow: any = new Date()
 
  arrKeyTime: any = []

  @Input() multi: any
  arr: any = ["1/22/20", "6/30/20", "12/31/20", "6/30/21", "12/19/21"]
  single: any = []
  view: [number, number] = [700, 500];
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
  autoScale:boolean = true
 
  yScaleMin:number = 0
  colorScheme: any = {
    domain: ['blue', 'red', 'green', ]
  };

  constructor(private service: CovidService, private datePipe: DatePipe) {
    this.service.covidSubject.subscribe(param => {
      this.choice = this.service.getChoiceRegion()
      this.time = this.service.getTiming()
      this.infor = this.service.getInfo()
      this.colorScheme = {
        domain: ['blue', 'red', 'green',]
      };
      console.log(this.colorScheme)
      console.log(this.time +"    "+this.infor)
      this.service.getTimeseriesByRegion(this.choice).subscribe((res: any) => {
        this.countryTimeseries = res[0].timeseries
     
        this.multi[0].series = this.service.getMultiChart(this.countryTimeseries, this.arr, this.multi[0].name)
        this.multi[1].series = this.service.getMultiChart(this.countryTimeseries, this.arr, this.multi[1].name)
        this.multi[2].series = this.service.getMultiChart(this.countryTimeseries, this.arr, this.multi[2].name)
        this.single = this.multi
        
      })

    })

  }


  ngOnInit(): void {
    this.choice = this.service.getChoiceRegion()
    console.log(this.infor)
    this.service.getTimeseriesByRegion(this.choice).subscribe((res: any) => {
      this.countryTimeseries = res[0].timeseries
      for (let key in this.countryTimeseries) {
        if (this.countryTimeseries.hasOwnProperty(key)) {
          this.arrKeyTime.push(key)
        }
      }
      this.multi[0].series = this.service.getMultiChart(this.countryTimeseries, this.arr, this.multi[0].name)
      this.multi[1].series = this.service.getMultiChart(this.countryTimeseries, this.arr, this.multi[1].name)
      this.multi[2].series = this.service.getMultiChart(this.countryTimeseries, this.arr, this.multi[2].name)
      this.single = this.multi

    })



  }

  showInformation() {
    console.log("change in4: "+ this.infor)
    switch (this.infor) {
      case '1':
        this.colorScheme = {
          domain: ['blue', 'green', 'red']
        };
        if(this.time === "0"){
          this.single = this.multi
        }
        if(this.time !=="0"){
          this.single = [

            {
              "name": "confirmed",
              "series": []
            },
            {
              "name": "deaths",
              "series": []
            },
            {
              "name": "recovered",
              "series": []
            }];
          let date: any = new Date()
          if(this.time ==="1"){
            date.setDate(date.getDate() - 7)
          }
          if(this.time ==="2"){
            date.setDate(date.getDate() - 30)
          }
          
          date = this.datePipe.transform(date, 'MM/dd/yy');
          let index = this.arrKeyTime.findIndex((item: any) => item === date)
          let arrDate = []
          for (let i = index; i < this.arrKeyTime.length; i++) {
            arrDate.push(this.arrKeyTime[i])
          }
          this.single[0].series = this.service.getMultiChart(this.countryTimeseries, arrDate, this.single[0].name)
          this.single[1].series = this.service.getMultiChart(this.countryTimeseries, arrDate, this.single[1].name)
          this.single[2].series = this.service.getMultiChart(this.countryTimeseries, arrDate, this.single[2].name)
         
        }
          
        
        
        break;
      case '2':
        this.colorScheme = {
          domain: ['blue']
        };
        this.single = [{
          "name": 'Confirmed',
          "series": []
        }]
        if (this.time === "0") {
          
          this.single[0].series = this.service.getMultiChart(this.countryTimeseries, this.arr, this.single[0].name)
            
          // this.yScaleMin = Math.min(...this.single[0].series.map((item:any) => item.value))
          // console.log(Math.min(...this.single[0].series.map((item: any) => item.value)))
        }
        if (this.time !== "0") {
          
          let date: any = new Date()
          if (this.time === "1") {
            date.setDate(date.getDate() - 7)
          }
          if (this.time === "2") {
            date.setDate(date.getDate() - 30)
          }

          date = this.datePipe.transform(date, 'MM/dd/yy');
          let index = this.arrKeyTime.findIndex((item: any) => item === date)
          let arrDate = []
          for (let i = index; i < this.arrKeyTime.length; i++) {
            arrDate.push(this.arrKeyTime[i])
          }
          this.single[0].series = this.service.getMultiChart(this.countryTimeseries, arrDate, this.single[0].name)
        
        }

        break;
      case '3':
        this.single = [{
          "name": 'Deaths',
          "series": []
        }]
        this.colorScheme = {
          domain: ['red']
        };
        if (this.time === "0") {
          this.single[0].series = this.service.getMultiChart(this.countryTimeseries, this.arr, this.single[0].name)
        }
        if (this.time !== "0") {

          let date: any = new Date()
          if (this.time === "1") {
            date.setDate(date.getDate() - 7)
          }
          if (this.time === "2") {
            date.setDate(date.getDate() - 30)
          }

          date = this.datePipe.transform(date, 'MM/dd/yy');
          let index = this.arrKeyTime.findIndex((item: any) => item === date)
          let arrDate = []
          for (let i = index; i < this.arrKeyTime.length; i++) {
            arrDate.push(this.arrKeyTime[i])
          }
          this.single[0].series = this.service.getMultiChart(this.countryTimeseries, arrDate, this.single[0].name)
          console.log(this.single)
        }
        break;
      case '4':
        this.single = [{
          "name": 'Recovered',
          "series": []
        }]
        this.colorScheme = {
          domain: ['green']
        };
        if (this.time === "0") {
          this.single[0].series = this.service.getMultiChart(this.countryTimeseries, this.arr, this.single[0].name)
        }
        if (this.time !== "0") {

          let date: any = new Date()
          if (this.time === "1") {
            date.setDate(date.getDate() - 7)
          }
          if (this.time === "2") {
            date.setDate(date.getDate() - 30)
          }

          date = this.datePipe.transform(date, 'MM/dd/yy');
          let index = this.arrKeyTime.findIndex((item: any) => item === date)
          let arrDate = []
          for (let i = index; i < this.arrKeyTime.length; i++) {
            arrDate.push(this.arrKeyTime[i])
          }
          this.single[0].series = this.service.getMultiChart(this.countryTimeseries, arrDate, this.single[0].name)
         
        }
        break;
      // default:
      // code block
    }

  }
  showInformationAtTime() {
    this.single = [

      {
        "name": "confirmed",
        "series": []
      },
      {
        "name": "deaths",
        "series": []
      },
      {
        "name": "recovered",
        "series": []
      }];

    switch (this.time) {
      case '1':
        let date: any = new Date()
        date.setDate(date.getDate() - 7)
        date = this.datePipe.transform(date, 'MM/dd/yy');
        let index = this.arrKeyTime.findIndex((item: any) => item === date)
        let arrDate = []
        for (let i = index; i < this.arrKeyTime.length; i++) {
          arrDate.push(this.arrKeyTime[i])
        }
        if(this.infor ==="1"){
          this.single[0].series = this.service.getMultiChart(this.countryTimeseries, arrDate, this.single[0].name)
          this.single[1].series = this.service.getMultiChart(this.countryTimeseries, arrDate, this.single[1].name)
          this.single[2].series = this.service.getMultiChart(this.countryTimeseries, arrDate, this.single[2].name)
        }
        if(this.infor ==="2"){
          this.single = [{
            "name": 'Confirmed',
            "series": []
          }]
          this.single[0].series = this.service.getMultiChart(this.countryTimeseries, arrDate, this.single[0].name)
          this.colorScheme = {
            domain: ['blue']
          };
        }
        if (this.infor === "3") {
          this.single = [{
            "name": 'Deaths',
            "series": []
          }]
          this.single[0].series = this.service.getMultiChart(this.countryTimeseries, arrDate, this.single[0].name)
          this.colorScheme = {
            domain: ['red']
          };
        }
        if (this.infor === "4") {
          this.single = [{
            "name": 'Recovered',
            "series": []
          }]
          this.single[0].series = this.service.getMultiChart(this.countryTimeseries, arrDate, this.single[0].name)
          this.colorScheme = {
            domain: ['green']
          };
        }
     
        break;
      case '2':
        let dateMonth: any = new Date()
        dateMonth.setDate(dateMonth.getDate() - 30)
        dateMonth = this.datePipe.transform(dateMonth, 'MM/dd/yy');
        let id = this.arrKeyTime.findIndex((item: any) => item === dateMonth)
        let arrDateMonth = []
        for (let i = id; i < this.arrKeyTime.length; i++) {
          arrDateMonth.push(this.arrKeyTime[i])
        }

        if (this.infor === "1") {
          this.single[0].series = this.service.getMultiChart(this.countryTimeseries, arrDateMonth, this.single[0].name)
          this.single[1].series = this.service.getMultiChart(this.countryTimeseries, arrDateMonth, this.single[1].name)
          this.single[2].series = this.service.getMultiChart(this.countryTimeseries, arrDateMonth, this.single[2].name)
        }
        if (this.infor === "2") {
          this.single = [{
            "name": 'Confirmed',
            "series": []
          }]
          this.single[0].series = this.service.getMultiChart(this.countryTimeseries, arrDateMonth, this.single[0].name)
          this.colorScheme = {
            domain: ['blue']
          };
        }
        if (this.infor === "3") {
          this.single = [{
            "name": 'Deaths',
            "series": []
          }]
          this.single[0].series = this.service.getMultiChart(this.countryTimeseries, arrDateMonth, this.single[0].name)
          this.colorScheme = {
            domain: ['red']
          };
        }
        if (this.infor === "4") {
          this.single = [{
            "name": 'Recovered',
            "series": []
          }]
          this.single[0].series = this.service.getMultiChart(this.countryTimeseries, arrDateMonth, this.single[0].name)
          this.colorScheme = {
            domain: ['green']
          };
        }
      
        break;
        break;

    }
  }

}
