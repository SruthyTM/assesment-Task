import {
  Component,
  OnInit,
  ViewChild,
  Inject,
  AfterViewInit,
  OnDestroy,
  Directive,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomerFormComponent } from '../customer-form/customer-form.component';
import { CustomerDeleteComponent } from '../customer-delete/customer-delete.component';
import { NotifierService } from 'angular-notifier';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-customer-listing',
  templateUrl: './customer-listing.component.html',
  styleUrls: ['./customer-listing.component.scss'],
})
export class CustomerListingComponent implements OnInit, AfterViewInit, OnDestroy {
  // userData = [{ id: 1, name: 'kk', movies: 'gggg' }];
  userData: any;
  userResult: any;
  pageVal = 1;
  disableNext = false;
  disablePrevious = false;
  editModalOpened = false;
  dialogResult: null;
  deleteModalOpened = false;

  constructor(
    @Inject(DOCUMENT) private _document: any,
    private _router: Router,
    private _user: UserService,
    public dialog: MatDialog,
    private _notifierService: NotifierService,
  ) {}

  openCustomerModal(id: any) {}
  async addUser() {
    if (this.editModalOpened == false) {
      let dialogRef = this.dialog.open(CustomerFormComponent, {
        data: {
          customer: '',
          action: 'Add',
          index: null,
        },
        width: '450px',
        panelClass: 'custom-modalbox',
      });

      dialogRef.afterClosed().subscribe(async (result: any) => {
        this.dialogResult = result;

        this.editModalOpened = false;
        console.log('here');

        try {
          const data = localStorage.getItem('customer');
          if (data) {
            let arrayData = JSON.parse(data);
            this.userResult = arrayData && arrayData.length > 0 ? arrayData : null;
          }
        } catch (err) {
          console.log(err);
        }
      });
    }
  }
  async ngOnInit() {
    const data = localStorage.getItem('customer');
    console.log(data);
    if (data) {
      let arrayData = JSON.parse(data);
      this.userResult = arrayData && arrayData.length > 0 ? arrayData : null;
    }

    console.log(this.userResult);
  }

  async editUser(user: any, index: number) {
    if (this.editModalOpened == false) {
      let dialogRef = this.dialog.open(CustomerFormComponent, {
        data: {
          customer: user,
          action: 'Edit',
          index: index,
        },
        width: '450px',
        panelClass: 'custom-modalbox',
      });

      dialogRef.afterClosed().subscribe(async (result: any) => {
        this.dialogResult = result;

        this.editModalOpened = false;
        console.log('here');

        try {
          const data = localStorage.getItem('customer');
          if (data) {
            let arrayData = JSON.parse(data);
            this.userResult = arrayData && arrayData.length > 0 ? arrayData : null;
          }
        } catch (err) {
          console.log(err);
        }
      });
    }
  }

  sortData(sort: Sort) {
    const data = this.userResult.slice();
    if (!sort.active || sort.direction === '') {
      this.userResult = data;
      return;
    }
    this.userResult = data.sort((a: any, b: any) => {
      const isAsc = sort.direction === 'desc';
      console.log('ff');
      return (a.age < b.age ? -1 : 1) * (isAsc ? 1 : -1);
    });
  }
  // async next() {
  //   this.disableNext = false;
  //   this.pageVal += 1;
  //   console.log(this.userData);
  //   if (this.userData && this.userData.data.length > 0) {
  //     this.userResult = this.userData.data;
  //   } else {
  //     this.userResult = [];
  //     this.disableNext = true;
  //   }
  // }
  // async previous() {
  //   if (this.pageVal == 1) {
  //     return;
  //   }
  //   this.disablePrevious = false;
  //   this.pageVal -= 1;
  //   this.userData = await this._user.getUsers(this.pageVal);
  //   if (this.userData && this.userData.data.length > 0) {
  //     this.userResult = this.userData.data;
  //   } else {
  //     this.userResult = [];
  //     this.disablePrevious = true;
  //   }
  // }
  ngAfterViewInit() {}

  async deleteUser(id: any, index: any) {
    console.log(id);
    console.log(index);
    if (this.deleteModalOpened == false) {
      let dialogRef = this.dialog.open(CustomerDeleteComponent, {
        data: {
          id: id,
          index: index,
        },
        width: '450px',
        panelClass: 'custom-modalbox',
      });

      dialogRef.afterClosed().subscribe(async (result: any) => {
        this.dialogResult = result;
        this.deleteModalOpened = false;

        console.log('here');

        try {
          const data = localStorage.getItem('customer');
          let arrayData = null;
          if (data) {
            arrayData = JSON.parse(data);
          }
          this.userResult = arrayData && arrayData.length > 0 ? arrayData : null;
        } catch (err) {
          console.log(err);
        }
      });
    }
  }

  ngOnDestroy() {}
}
