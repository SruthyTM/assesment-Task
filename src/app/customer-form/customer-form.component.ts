import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

import { DOCUMENT } from '@angular/common';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-customer-modal',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss'],
})
export class CustomerFormComponent implements OnInit {
  customer: any;
  action = null;
  index = 0;

  CustomerForm: FormGroup;
  heading = 'Add User';

  constructor(
    public thisDialogRef: MatDialogRef<CustomerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(DOCUMENT) private _document: any,
    private _router: Router,
    private _user: UserService,
    private _notifierService: NotifierService,
    private _formBuilder: FormBuilder,
  ) {
    this.customer = this.data.customer;
    this.action = this.data.action;
    console.log(this.customer);
    if (this.action == 'Edit') {
      this.CustomerForm = this.validateCustomerFields();
      this.heading = 'Edit User';
      this.index = this.data.index;
    } else {
      let TotalRes = localStorage.getItem('customer') ? localStorage.getItem('customer') : null;
      4;
      if (TotalRes && TotalRes.length > 0) {
      }
      this.CustomerForm = this.editCustomerFields();
    }
  }
  async ngOnInit() {}

  async saveButtonHandler() {
    if (this.CustomerForm.invalid) {
      return;
    }
    try {
      const updateValue = this.CustomerForm.value;
      let result = null;
      let TotalRes = localStorage.getItem('customer') ? localStorage.getItem('customer') : null;

      if (this.action == 'Edit') {
        const updateValue = this.CustomerForm.value;
        console.log(TotalRes);
        let arrayData1 = [];

        if (TotalRes && TotalRes.length > 0) {
          console.log(TotalRes);
          arrayData1 = JSON.parse(TotalRes);
        }
        console.log(arrayData1);
        // let i=-1;
        this.index = this.data.index;
        arrayData1[this.index].value = updateValue;
        console.log(arrayData1);
        localStorage.removeItem('customer');

        localStorage.setItem('customer', JSON.stringify(arrayData1));
      } else {
        let arrayData = [];
        this.CustomerForm.value.id = 1;
        const updateValue1 = this.CustomerForm.value;
        if (TotalRes && TotalRes.length > 0) {
          arrayData = JSON.parse(TotalRes);
          console.log(arrayData);
          this.CustomerForm.value.id = arrayData.length + 1;
        }
        console.log(arrayData);
        arrayData.push({
          value: updateValue1,
        });
        console.log('herreee');
        console.log();
        let array = [];
        // array.push(arrayData);
        localStorage.setItem('customer', JSON.stringify(arrayData));
      }
      this.thisDialogRef.close();
      alert('Customer Updated Successfully.');
    } catch (error) {
      console.log('Failed to update the user', error);
    }
  }

  onCloseConfirm() {
    this.thisDialogRef.close('Confirm');
  }

  ngAfterViewInit() {}

  ngOnDestroy() {}
  // changeNewsLetter(event: any) {
  //   this.customer.newsletter = true;
  //   this.CustomerForm.patchValue({
  //     newsletter: event.value,
  //   });
  // }
  valuechanged(event: any) {
    this.customer.gender = event.value;
    this.CustomerForm.patchValue({
      gender: event.value,
    });
  }

  private validateCustomerFields() {
    const form = this._formBuilder.group({
      id: [this.customer.id],
      name: [this.customer.value.name, Validators.required],
      age: [
        this.customer.value.age,
        [Validators.required, Validators.minLength(1), Validators.maxLength(3)],
      ],
      phone: [this.customer.value.phone, Validators.required],
      newsletter: [this.customer.value.newsletter, Validators.required],
      gender: [this.customer.value.gender, Validators.required],
    });
    return form;
  }
  private editCustomerFields() {
    const form = this._formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1), Validators.max(3)]],
      phone: ['', Validators.required], //field validation added in html
      newsletter: [true, Validators.required],
      gender: ['F', Validators.required],
    });
    return form;
  }
}
