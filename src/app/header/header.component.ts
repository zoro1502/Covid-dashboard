import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CovidService } from 'src/services/covid.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  listPatientStatus:boolean = false;
  
  constructor(private router: Router, private service: CovidService) {
    this.service.loginStatusSubject.subscribe((param:any)=>{
      this.listPatientStatus = param
    })
  }

  ngOnInit(): void {}

  loginClick() {
    this.router.navigate(['login']);
  }
  logoutClick(){
    this.service.logout()
  }
}
