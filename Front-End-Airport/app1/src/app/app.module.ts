import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CollapsibleModule} from "angular2-collapsible";


import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms";
import { Init1Component } from './init1/init1.component';
import { RouteconfigComponent } from './routeconfig/routeconfig.component';
import { RouterModule, Routes } from "@angular/router";
import {HttpModule} from "@angular/http";
import { NgForm } from "@angular/forms";
import { RoutesComponent } from './routes/routes.component';
import { FlightRoutesMapComponent } from './flight-routes-map/flight-routes-map.component';
import { ShowMapComponent } from './show-map/show-map.component';
import { HomeComponent } from './home/home.component';
import { ConfigComponent } from './config/config.component';

const appRoutes: Routes =  [
  {path: '', component: Init1Component},
  {path: 'login', component: Init1Component},
  {path: 'home/:id', component: HomeComponent},
  {path: 'config/:id', component: ConfigComponent},
  {path: 'airport/:id', component: RouteconfigComponent},
  {path: 'airport_routes/:id', component: RoutesComponent},
  {path: 'airport_flight_map/:id', component: FlightRoutesMapComponent},
  {path: 'airport_show_map/:id', component: ShowMapComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    Init1Component,
    RouteconfigComponent,
    RoutesComponent,
    FlightRoutesMapComponent,
    ShowMapComponent,
    HomeComponent,
    ConfigComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    CollapsibleModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
