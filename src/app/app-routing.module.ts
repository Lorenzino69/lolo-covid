import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CountryComponent } from './pages/country/country.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {ActuComponent} from './pages/actu/actu.component';
import {CalculatorComponent} from './pages/calculator/calculator.component';


const routes: Routes = [
  { path: '',  component: DashboardComponent},
  { path: 'actu', component : ActuComponent},
  { path: 'country/:name', component : CountryComponent},
  { path: 'calculator', component : CalculatorComponent},
  { path: '**', component : NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
