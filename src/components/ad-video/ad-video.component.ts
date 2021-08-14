import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { HomeComponent } from '@pages/home/home.component';
import { interval, Subscription } from 'rxjs';
import { IAdEvent } from 'ubimo-ad-dispatcher';
import { AddsService } from '@services/adds.service';

@Component({
  selector: 'app-ad-video',
  templateUrl: './ad-video.component.html',
  styleUrls: ['./ad-video.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdVideoComponent implements OnInit, OnDestroy {
  @Input('ad-object') adObject!: IAdEvent;
  public unique_key!: number;
  public parentRef!: HomeComponent;
  progress: number = 20;
  positionX = 0;
  positionY = 0;
  sub!: Subscription;
  constructor(public addsService: AddsService) {}

  ngOnInit(): void {
    this.positionX = this.addsService.calcAddPosition(
      this.parentRef.offSetWidth,
      this.adObject.coordinates.x
    );
    this.positionY = this.addsService.calcAddPosition(
      this.parentRef.offSetHight,
      this.adObject.coordinates.y
    );
    this.startTimer();
  }

  removeComponent() {
    this.parentRef.remove(this.unique_key);
  }

  startTimer() {
    const source = interval(1000);
    this.sub = source.subscribe((val) => {
      console.log(val);
      this.progress = this.progress + 20;
      this.parentRef.cdr.detectChanges();
      if (val > 5) {
        this.removeComponent();
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
