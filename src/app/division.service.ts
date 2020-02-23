import { Injectable } from '@angular/core';
import { division } from './division';

export interface Division {
  code: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class DivisionService {
  division_json: Division [];
  isMunicipality: boolean;

  constructor() { }

  getDivision() {
    this.division_json = [];
    const lines = division.split('\n');
    for (let line of lines) {
      let l = line.split(/\s+/);
      this.division_json.push({
        'code': l[0],
        'name': l[1]
      });
    }
  }


  getProcince() {
    this.isMunicipality = false;
    if (!this.division_json) {
      // console.log('getJson');
      this.getDivision();
    }
    return this.division_json.filter(i => i.code.substr(2,4) === '0000');
  }

  getCity(province) {
    this.isMunicipality = false;
    let city = this.division_json.filter(i => i.code.substr(0,2) === province.code.substr(0,2) && i.code.substr(4,2) ==='00' && i.code.substr(2,2) != '00');

    if (city.length === 0) {
      // console.log('直');
      this.isMunicipality = true;
      city = [province];
    }
    return city;
  }

  getCounty(city) {

    let county;
    if (this.isMunicipality) {
      county = this.division_json.filter(i => i.code.substr(0,2) === city.code.substr(0,2) && i.code.substr(4,2) != '00');
    }
    else {
      county = this.division_json.filter(i => i.code.substr(0,4) === city.code.substr(0,4) && i.code.substr(4,2) != '00');
    }
    if (county.length === 0){
      county = [city];
    }
    return county;
  }

}
