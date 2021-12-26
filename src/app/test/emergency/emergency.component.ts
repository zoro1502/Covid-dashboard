import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CovidService } from 'src/services/covid.service';

@Component({
  selector: 'app-emergency',
  templateUrl: './emergency.component.html',
  styleUrls: ['./emergency.component.css']
})
export class EmergencyComponent implements OnInit {
  emergency!:FormGroup;


  constructor(private fb:FormBuilder,private service:CovidService) { 
    this.emergency = this.fb.group({
      name:[],
      age:[],
      address:this.fb.group({
        street:[],
        province:[],
        city:[],
      }),
      feeling:[]
    });
  }

  ngOnInit(): void {

  }


  get name(){
    return this.emergency.get('name') as FormControl;
  }
  get age(){
    return this.emergency.get('age') as FormControl;
  }
  get address(){
    return this.emergency.get('address') as FormGroup;
  }
  get street(){
    return this.emergency.get('street') as FormControl;
  }
  get province(){
    return this.emergency.get('province') as FormControl;
  }
  get city(){
    return this.emergency.get('city') as FormControl;
  }
  get feeling(){
    return this.emergency.get('feeling') as FormControl;
  }

  sendPatient(){
    let patient:Patient = {
      id:Math.floor(Math.random()*1000000),
      ...this.emergency.value};
   this.service.handleInsertPatient(patient); // dua vao mang
   alert("The hospital will call you soon,, take care !");
   this.emergency.reset();
  }

}
