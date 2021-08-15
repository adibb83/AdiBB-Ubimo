import {
  ViewChild,
  Component,
  OnInit,
  ElementRef,
  NgZone,
} from '@angular/core';

import { AddsService } from 'src/app/services/adds.service';
import { IAdEvent, adDispatcher } from 'ubimo-ad-dispatcher';
import { ExtendIAdEvent } from '@models/adds.models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ads-page',
  templateUrl: './ads-page.component.html',
  styleUrls: ['./ads-page.component.scss'],
})
export class AdsPageComponent implements OnInit {
  @ViewChild('main') refMain!: ElementRef;
  adList: ExtendIAdEvent[] = [];
  logAdsList: ExtendIAdEvent[] = [];
  startTime!: number;
  endTime!: number;
  offSetWidth: number = 0;
  offSetHight: number = 0;
  child_unique_key: number = 0;
  sub!: { removeListener: () => void };
  isFilterd = false;
  constructor(
    public addService: AddsService,
    private ngZone: NgZone,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.sub = adDispatcher.registerToAdEvents((ad) => {
      this.ngZone.run(() => {
        this.addItemToList(ad);
      });
    });
  }

  ngAfterViewInit() {
    this.addService.offSetWidth = this.refMain.nativeElement.offsetWidth;
    this.addService.offSetHight = this.refMain.nativeElement.offsetHeight;
  }

  addItemToList(ad: IAdEvent) {
    let extende: ExtendIAdEvent = ad;
    extende.id = this.child_unique_key;
    this.child_unique_key = ++this.child_unique_key;
    extende.time = this.addService.convertDateToTimestamp(new Date());
    extende.isActive = true;
    console.log(extende);
    this.adList.unshift(extende);
    this.logAdsList.unshift(extende);
  }

  filterLog() {
    console.log(this.startTime, this.endTime);
    if (
      this.addService.isMoment(this.startTime) &&
      this.addService.isMoment(this.endTime)
    ) {
      this.logAdsList = this.adList.filter(
        (ad) => ad?.time && ad.time >= this.startTime && ad.time <= this.endTime
      );
      this.isFilterd = true;
    } else {
      this.openSnackBar('Invalid Time Stamp');
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message)._dismissAfter(3000);
  }

  resetLog() {
    this.logAdsList = this.adList;
    this.isFilterd = false;
  }

  ngOnDestroy(): void {
    this.sub.removeListener();
  }
}
