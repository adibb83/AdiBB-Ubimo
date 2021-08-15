import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { IAdEvent } from 'ubimo-ad-dispatcher';
import { ExtendIAdEvent } from '@models/adds.models';
import { AddsService } from '@services/adds.service';
import { AdsPageComponent } from '@pages/ads-page/ads-page.component';

@Component({
  selector: 'app-ad-pop',
  templateUrl: './ad-pop.component.html',
  styleUrls: ['./ad-pop.component.scss'],
})
export class AdPopComponent implements OnInit {
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Input('ad-object') adObject!: ExtendIAdEvent;
  public unique_key!: number;
  public parentRef!: AdsPageComponent;
  progress: number = 20;
  positionX = 0;
  positionY = 0;
  sub!: Subscription;
  constructor(public addsService: AddsService) {}

  ngOnInit(): void {
    this.positionX = this.addsService.calcAdPosition(
      this.addsService.offSetWidth,
      this.adObject.coordinates.x
    );

    this.positionY = this.addsService.calcAdPosition(
      this.addsService.offSetHight,
      this.adObject.coordinates.y
    );
    this.startTimer();
  }

  startTimer() {
    const source = interval(1000);
    this.sub = source.subscribe((val) => {
      this.progress = this.progress + 20;
      if (val > 5) {
        this.close.emit(null);
        this.sub.unsubscribe();
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
