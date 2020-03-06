import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AddressService } from '../address.service';
import { Address } from '../address';

import { DivisionService } from '../division.service';

export interface Division {
  code: string;
  name: string;
}

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  // @Output() changed = new EventEmitter();
  address: Address;
  addressForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
    ]),
    address: new FormGroup({
      province: new FormControl('', [
        Validators.required,
      ]),
      city: new FormControl('', [
      ]),
      county: new FormControl('', [
        Validators.required,
      ]),
      street: new FormControl('', [
        Validators.required,
      ]),
      postcode: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]{6}'),
      ])
    }),
    agency: new FormControl('', [
    ]),
    phone: new FormControl('', [
      Validators.required,
    ]),
    description: new FormControl('', [
    ])
  });

  // isEditAddress: boolean;
  provinceD: Division[];
  cityD: Division[];
  countyD: Division[];
  // theAddress: Address;

  constructor(
    private addressService: AddressService,
    private divisionService: DivisionService,
  ) { }

  ngOnInit() {
    this.getAddress();
    this.getProvince();
    // this.isEditAddress = false;
    // this.newAddress();
  }

  changeAddress() {
    // this.changed.emit(this.theAddress);
  }

  getAddress(): void {
    this.addressService.getAddress().subscribe(
      address => {
        if (address) {
          this.address = address;
          this.setValues(this.address);
        }
      }
    );
    // this.address = JSON.parse(localStorage.getItem('address'));
  }

  setValues(address) {
    const provinceId = this.provinceD.findIndex(i => i.code == address.address.province.code);
    this.cityD = this.divisionService.getCity(address.address.province);
    const cityId = this.cityD.findIndex(i => i.code == address.address.city.code);
    this.countyD = this.divisionService.getCounty(address.address.city);
    const countyId = this.countyD.findIndex(i => i.code == address.address.county.code);

    this.addressForm.setValue({
      name: address.name,
      address: {
        province: this.provinceD[provinceId],
        city: this.cityD[cityId],
        county: this.countyD[countyId],
        street: address.address.street,
        postcode: address.address.postcode
      },
      agency: address.agency,
      phone: address.phone,
      description: address.description
    })
  }

  getProvince(): void {
    if (!this.provinceD) {
      // console.log('getPro');
      this.provinceD = this.divisionService.getProcince();
    }
  }

  provinceChanged() {
    this.getCity();
    this.countyD = [];
    this.city.setValue(null);
    this.county.setValue(null);
  }

  cityChanged() {
    this.getCounty();
    this.county.setValue(null);
  }

  getCity(): void {
    this.cityD = this.divisionService.getCity(this.province.value);
  }

  getCounty(): void {
    this.countyD = this.divisionService.getCounty(this.city.value);
  }

  newAddress() {
    // this.isEditAddress = true;
    // this.addressForm;

    this.getProvince();
  }

  get name() { return this.addressForm.get('name'); }
  get province() { return this.addressForm.get('address').get('province'); }
  get city() { return this.addressForm.get('address').get('city'); }
  get county() { return this.addressForm.get('address').get('county'); }

  get street() { return this.addressForm.get('address').get('street'); }
  get agency() { return this.addressForm.get('agency'); }
  get postcode() { return this.addressForm.get('address').get('postcode'); }
  get phone() { return this.addressForm.get('phone'); }
  get description() { return this.addressForm.get('description'); }


  saveAddress() {
    // if (!this.address)
    // {
    //   this.address = [this.addressForm.value];
    // }
    // else {
    //   this.address.push(this.addressForm.value)
    // }
    // localStorage.setItem('address', JSON.stringify(this.address));
    if (this.addressForm.touched && this.addressForm.dirty) {
      this.addressService.saveAddress(this.addressForm.value).subscribe(() => { });
    }
    // this.isEditAddress = false;
  }

  // getAddressOut(address: Address): string {
  //   return [
  //     address.province.name,
  //     address.city.code === address.province.code ? '' : address.city.name,
  //     address.county.code === address.city.code ? '' : address.county.name,
  //     address.street,
  //     '，',
  //     address.postcode,
  //     '，',
  //     '收件人：',
  //     address.name,
  //     '，',
  //     '电话：',
  //     address.phone
  //   ].join('');
  // }

}
