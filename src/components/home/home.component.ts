import { Component, OnInit } from '@angular/core';
import { AddsService } from '@services/adds.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private addService:AddsService){}

  ngOnInit(): void {
    this.addService.startListeningToEvents();
  }

}
