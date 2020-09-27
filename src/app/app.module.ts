import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LayoutComponent} from './layouts/layout.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {TopbarComponent} from './layouts/topbar/topbar.component';
import {NavbarComponent} from './layouts/navbar/navbar.component';
import {FooterComponent} from './layouts/footer/footer.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {CountryComponent} from './pages/country/country.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {CountupComponent} from './shared/countup/countup.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import {ActuComponent} from './pages/actu/actu.component';
import {ActuService} from './shared/actu.service';
import {MatCardModule} from '@angular/material/card';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatButtonModule} from '@angular/material/button';
import {CalculatorComponent} from './pages/calculator/calculator.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogCalculatorComponent } from './pages/dialog-calculator/dialog-calculator.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  };
export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http);
}



@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,TopbarComponent, NavbarComponent, FooterComponent,
    DashboardComponent, CountryComponent, NotFoundComponent, CountupComponent, ActuComponent, CalculatorComponent, DialogCalculatorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule, CommonModule,
    RouterModule,
    PerfectScrollbarModule,
    ModalModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production, registrationStrategy: 'registerImmediately'}),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }), MatCardModule, MatButtonToggleModule, MatRadioModule,
    MatButtonModule, MatCheckboxModule, FormsModule, ReactiveFormsModule,MatDialogModule,MatStepperModule,MatSlideToggleModule,
    MatToolbarModule

  ],entryComponents: [
    DialogCalculatorComponent
  ],
  providers:[{
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  },ActuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
