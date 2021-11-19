import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

import { ActivatedRoute, Router } from '@angular/router';

import { DOCUMENT } from '@angular/common';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { environment } from 'src/environments/environment';
import { UserService } from '../services/user.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-customer-delete',
  templateUrl: './customer-delete.component.html',
  styleUrls: ['./customer-delete.component.scss'],
})
export class CustomerDeleteComponent implements OnInit {
  productImages = null;

  productImageData = null;
  arrayData = [];
  id = 0;
  index = 0;
  constructor(
    public thisDialogRef: MatDialogRef<CustomerDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(DOCUMENT) private _document: any,
    private _router: Router,
    private _user: UserService,
    private _notifierService: NotifierService,
    private _formBuilder: FormBuilder,
  ) {
    const TotalRes = localStorage.getItem('customer') ? localStorage.getItem('customer') : null;
    if (TotalRes && TotalRes.length > 0) {
      this.arrayData = JSON.parse(TotalRes);
      console.log(this.arrayData);
    }
    if (this.data) {
      this.id = this.data.id;
      this.index = this.data.index;
    }
  }

  ngOnInit() {}
  onCloseConfirm() {
    this.thisDialogRef.close('Confirm');
  }
  async deleteCustomer() {
    let id: number = this.id;
    console.log(this.index);
    // let exisist = this.arrayData.findIndex((item) => item.id === this.data.id);
    this.arrayData.splice(this.index, 1);
    console.log(this.arrayData);
    this.thisDialogRef.close();

    localStorage.setItem('customer', JSON.stringify(this.arrayData));
    if (this.arrayData.length === 0) {
      localStorage.removeItem('customer');
    }
    alert('Customer Deleted Successfully.');
  }
}
