import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgReduxModule } from '@angular-redux/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { InputComponent } from './components/input/input.component';
import { MessagesComponent } from './components/messages/messages.component'; 

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    InputComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgReduxModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
