import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from 'app/app-routing.module';
import { FontModule } from 'app/font.module';
import { NgJsonEditorModule } from 'ang-jsoneditor';

import { AppComponent } from 'app/app.component';
import { BridgeComponent } from 'app/bridge/bridge.component';
import { OperationProxyComponent } from 'app/bridge/components/operation-proxy/operation-proxy.component';
import { ServiceListComponent } from 'app/bridge/components/service-list/service-list.component';
import { HeaderComponent } from 'app/layout/header/header.component';
import { environment } from 'environments/environment';
import { fakeBackendProvider } from 'app/mock/mock.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    BridgeComponent,
    HeaderComponent,
    OperationProxyComponent,
    ServiceListComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FontModule,
    NgJsonEditorModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent],
  providers: [
    environment.mock ? fakeBackendProvider : []
  ]
})
export class AppModule { }
