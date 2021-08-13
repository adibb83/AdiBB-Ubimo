import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddsService } from '@services/adds.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from '@pages/home/home.component';
import { AdImageComponent } from '@components/ad-image/ad-image.component';
import { AdVideoComponent } from '@components/ad-video/ad-video.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material-module/material.module'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdImageComponent,
    AdVideoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule
  ],
  providers: [AddsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
