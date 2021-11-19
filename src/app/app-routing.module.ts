import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListingComponent } from './customer-listing/customer-listing.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { NotifierModule, NotifierOptions } from 'angular-notifier';

const routes: Routes = [
  { path: '', component: CustomerListingComponent },
  { path: 'details', component: CustomerListingComponent },
];
const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'left',
      distance: 12,
    },
    vertical: {
      position: 'bottom',
      distance: 12,
      gap: 10,
    },
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4,
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease',
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50,
    },
    shift: {
      speed: 300,
      easing: 'ease',
    },
    overlap: 150,
  },
};
@NgModule({
  imports: [RouterModule.forRoot(routes), NotifierModule.withConfig(customNotifierOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
