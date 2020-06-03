import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CommonModule, HashLocationStrategy, LocationStrategy} from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import 'rxjs/add/operator/switchMap';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

import {RouterModule} from '@angular/router';

import {routing} from './app.routing';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import {InterceptorService} from './interceptors/interceptor.service';
import {AuthGuard} from './guards/auth.guard';
import {AlertService} from './services/alert.service';
import {AuthenticationService} from './services/authentication.service';
import {CommonService} from './services/common.service';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { IeWarningComponent } from './components/ie-warning/ie-warning.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown'
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AlertComponent } from './components/alert/alert.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MenuItems} from './shared/menu-items/menu-items';
import { RegistrationComponent } from './components/registration/registration.component';

// import { Ng4FilesModule } from 'angular4-files-upload';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PreloaderComponent,
    IeWarningComponent,

    DashboardComponent,
    AlertComponent,
    RegistrationComponent,
  ],
  imports: [
    BrowserModule,
    NgSelectModule,
    FormsModule,
    HttpClientModule,
    routing,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    NoopAnimationsModule,
    NgxDatatableModule,
    AngularMultiSelectModule,
    // Ng4FilesModule
  ],
  providers: [
    AlertService,
    AuthGuard,
    AuthenticationService,
    CommonService,
    MenuItems,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
