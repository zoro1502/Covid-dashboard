import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CovidService } from 'src/services/covid.service';
import { AngularFireDatabase } from '@angular/fire/compat/database'

@Component({
  selector: 'app-list-patient',
  templateUrl: './list-patient.component.html',
  styleUrls: ['./list-patient.component.css'],
})
export class ListPatientComponent implements OnInit {
  listPatient: any = []
  p:any = 1
  constructor(private db: AngularFireDatabase ,private service: CovidService, private router: Router) {
    this.getListPatient()
   
  }

  ngOnInit(): void {}

  getPatients() {
    return new Promise((resolve: any, reject: any) => {
      this.db.list("patient").valueChanges().subscribe(value => {
        resolve(value);
      })
    })
  }

  async getListPatient() {
    let pt: any;
    await this.getPatients().then(value => {
      pt = value;
    })
    this.listPatient = pt
    localStorage.setItem("list",JSON.stringify(this.listPatient))
  }
  choosePatient(patient_id:number){
  localStorage.setItem("id",JSON.stringify(patient_id))
  this.router.navigate(['list-patient',patient_id]);
  }
}
