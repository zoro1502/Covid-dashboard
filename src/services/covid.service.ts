import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database'

@Injectable({ 
  providedIn: 'root',
})
export class CovidService {
  choice:string = 'AR'
  infor:string = "1"
  time:string = "0"
  loginStatus:boolean = false;
  currentUser!:any

  covidSubject = new Subject()
  loginStatusSubject = new Subject()

  constructor(private http: HttpClient,
    private db:AngularFireDatabase) {}

  getChoiceRegion(){
    return this.choice
  }
  getInfo(){
    return this.infor
  }
  getTiming(){
    return this.time
  }

  getTotal() {
    return this.http.get(
      'https://master-covid-19-api-laeyoung.endpoint.ainize.ai/jhu-edu/brief'
    );
  }

  getListCase() {
    return this.http.get(
      'https://master-covid-19-api-laeyoung.endpoint.ainize.ai/jhu-edu/latest?onlyCountries=true'
    );
  }

  getTimeseriesByRegion(value:string){
    return this.http.get(`https://master-covid-19-api-laeyoung.endpoint.ainize.ai/jhu-edu/timeseries?iso2=${value}&onlyCountries=true`)
  }

  getCaseByCountry(country: string) {
    this.choice = country
    this.infor = '1'
    this.time = '0'
    this.covidSubject.next()
    return this.http.get(
      `https://master-covid-19-api-laeyoung.endpoint.ainize.ai/jhu-edu/latest?iso2=${country}&onlyCountries=true`
    );
  }
  
  getTimes(){
    return this.http.get(`https://master-covid-19-api-laeyoung.endpoint.ainize.ai/jhu-edu/timeseries?onlyCountries=true`)
  }


  getInWolrd(confirm: any, word: any, value:any) {
    return confirm.reduce((tot: any, curr: any) => {
      tot = tot + curr[word][value]
      return tot
    }, 0)
  }

  getDayInTheWorld(arr: any, confirm: any, value: any){
    value = value.toLowerCase()
    return arr.reduce((total: any, current: any) => {
      let obj = {
        "name": current,
        "value": this.getInWolrd(confirm,current,value)
      }
      total.push(obj)
      return total
    }, [])
  }

  getMultiChart(countryTimeseries:any,arr:any,value:any){
    value = value.toLowerCase()
   return arr.reduce((total: any, current: any) => {
      let obj = {
        "name": current,
        "value": countryTimeseries[current][value]
      }
      total.push(obj)
      return total
    }, [])
  }


  handleInsertPatient(patient:any){
      this.db.object('patient/'+String(patient.id)).set(patient);
  }

  getLoginStatus(user:any){
    this.loginStatus = true;
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUser = user
    this.loginStatusSubject.next(this.loginStatus)
  }
  logout(){
    this.loginStatus = false;
    localStorage.removeItem('currentUser');
    this.loginStatusSubject.next(this.loginStatus)
  }
}
