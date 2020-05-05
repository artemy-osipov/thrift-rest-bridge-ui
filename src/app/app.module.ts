import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from 'app/app-routing.module';
import { FontModule } from 'app/font.module';
import { MaterialModule } from 'app/material-module';

import { AppComponent } from 'app/app.component';
import { ServiceListComponent } from 'app/service-list/service-list.component';
import { HeaderComponent } from 'app/shared/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ServiceListComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FontModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
