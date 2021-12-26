import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CovidService } from 'src/services/covid.service';
import { AngularFireDatabase } from '@angular/fire/compat/database'



@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent implements OnInit {
  id:any
  listPatient:any
  item!:Patient
  arr:any = [1,2,3]
  constructor(private route:ActivatedRoute,private service:CovidService) { 
    this.listPatient = localStorage.getItem("list")
    this.listPatient = JSON.parse(this.listPatient)
     
    this.route.paramMap.subscribe((pr:any)=>{
      this.id = Number(pr.get("id"))
      this.item = this.listPatient.find((value: Patient)=>value.id === this.id)

    
      
    })
    
    
  }

  ngOnInit(): void {
  }

}
