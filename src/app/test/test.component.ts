import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  testForm!: FormGroup;
  data!: any;
  status!: string;
  formStatus: boolean = true;
  imgDanger: boolean = true;
  imgMedium: boolean = true;
  imgCommon: boolean = true;
  percent:number =0;
  dangerStatus:boolean=false;
  constructor(private fb: FormBuilder) {
    this.testForm = this.fb.group({
      common: this.fb.group({
        common1: [],
        common2: [],
        common3: [],
        common4: [],
      }),
      medium: this.fb.group({
        medium1: [],
        medium2: [],
        medium3: [],
      }),
      serious: this.fb.group({
        serious1: [],
        serious2: [],
        serious3: [],
      }),
    });
  }

  ngOnInit(): void {}
  get common() {
    return this.testForm.get('common');
  }
  get medium() {
    return this.testForm.get('medium');
  }
  get serious() {
    return this.testForm.get('serious');
  }

  get common1() {
    return this.testForm.get('common1') as FormControl;
  }
  get common2() {
    return this.testForm.get('common2') as FormControl;
  }
  get common3() {
    return this.testForm.get('common3') as FormControl;
  }
  get common4() {
    return this.testForm.get('common4') as FormControl;
  }
  get medium1() {
    return this.testForm.get('medium1') as FormControl;
  }
  get medium2() {
    return this.testForm.get('medium2') as FormControl;
  }
  get medium3() {
    return this.testForm.get('medium3') as FormControl;
  }
  get serious1() {
    return this.testForm.get('serious1') as FormControl;
  }
  get serious2() {
    return this.testForm.get('serious2') as FormControl;
  }
  get serious3() {
    return this.testForm.get('serious3') as FormControl;
  }

  submit() {

    this.formStatus = true;
    this.imgDanger = true;
    this.imgMedium = true;
    this.imgCommon = true;
    let commonForm: any = Object.values(this.testForm.value.common);
    let mediumForm: any = Object.values(this.testForm.value.medium);
    let seriousForm: any = Object.values(this.testForm.value.serious);
    let count = 0;
    let percent = 0;
    for (let i = 0; i < seriousForm.length; i++) {
      if (seriousForm[i] == true) {
        count++;
      }
    }
    if (count >= 2) {
      percent = 90;
      this.status =
        'You must contact a medical facility immediately because the symptoms you are experiencing are very dangerous';
      this.imgDanger = false;
      this.dangerStatus = true;
    } else {
      commonForm.map((element: any) => {
        if (element == true) {
          percent += 5;
        }
      });
      mediumForm.map((element: any) => {
        if (element == true) {
          percent += 10;
        }
      });
      seriousForm.map((element: any) => {
        if (element == true) {
          percent += 30;
        }
      });
      if(percent<=0){
        this.status = 'You must choose something';
        this.dangerStatus = false;
      }
      if (percent <= 49 && percent > 0) {
        this.status = 'May be it is the flu, take care yourself more few days';
        this.imgCommon = false;
        this.dangerStatus = false;

      }
      if (percent > 49 && percent <= 80) {
        this.status =
          'Be careful, these symptoms are common symptoms of covid 19 patients, if you feel unwell, contact the medical center immediately';
        this.imgMedium = false;
        this.dangerStatus = false;
      }
    }
    this.formStatus = false;
    this.percent = percent;
  }

  reset() {
    this.testForm.reset();
    this.formStatus = true;
    this.imgDanger= true;
    this.imgMedium = true;
    this.imgCommon= true;
    this.percent = 0;
    this.dangerStatus = false;
  }
}
