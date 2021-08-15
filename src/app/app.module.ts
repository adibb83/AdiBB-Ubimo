import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddsService } from 'src/app/services/adds.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdsPageComponent } from '@pages/ads-page/ads-page.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material-module/material.module';
import { AdPopComponent } from './components/ad-pop/ad-pop.component';

@NgModule({
  declarations: [AppComponent, AdsPageComponent, AdPopComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
  ],
  providers: [AddsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
