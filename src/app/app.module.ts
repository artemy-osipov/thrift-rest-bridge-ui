import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from 'app/app-routing.module';
import { FontModule } from 'app/font.module';
import { MaterialModule } from 'app/material.module';

import { AppComponent } from 'app/app.component';
import { ServicesComponent } from 'app/services/services.component';
import { ServiceProxyComponent } from 'app/service-proxy/service-proxy.component';
import { HeaderComponent } from 'app/layout/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ServicesComponent,
    ServiceProxyComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FontModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
