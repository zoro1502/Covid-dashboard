import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CovidService } from 'src/services/covid.service';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css'],
})
export class RegionComponent implements OnInit {
  arr!: any
  choice!: any
  country!: any
  rate!: any
  infor: any = '1'
  time: any = '0'
  multi: any = [

    {
      "name": "Confirmed",
      "series": []
    },
    {
      "name": "Deaths",
      "series": []
    },
    {
      "name": "Recovered",
      "series": []
    }];
  constructor(private service: CovidService, private router: Router, private route: ActivatedRoute) {
    
  }

 

  ngOnInit(): void {
    this.service.getListCase().subscribe((response: any) => {

      let newArr = response.filter((item: any) => {
        return item.countrycode !== undefined
      })

      this.arr = newArr.reduce((covid: any, current: any) => {
        if (covid.indexOf(current.countrycode.iso2) === -1) {
          covid.push(current)
        }
        return covid
      }, [])
    });
    this.choice = this.service.getChoiceRegion()
    this.service.getCaseByCountry(this.choice).subscribe((res: any) => {
      this.country = res[0]

      this.rate = ((this.country.deaths / this.country.confirmed) * 100).toFixed(2)
    })
  }


  getSelect() {
    this.infor = '1'
    this.time = '0'
    this.service.getCaseByCountry(this.choice).subscribe((res: any) => {
      this.country = res[0]
      
      this.rate = ((this.country.deaths / this.country.confirmed) * 100).toFixed(2)
      this.multi = [

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
    })

  }
}
