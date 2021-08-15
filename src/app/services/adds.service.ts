import { Injectable } from '@angular/core';
import { adDispatcher, IAdEvent } from 'ubimo-ad-dispatcher';
import { map, Observable, tap } from 'ubimo-ad-dispatcher/node_modules/rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class AddsService {
  public offSetWidth = 0;
  public offSetHight = 0;

  constructor() {}
  calcAdPosition(parentWidth: number, coordinate: number): number {
    let precent = 0;
    precent = (100 * coordinate) / parentWidth;
    if (precent < 4) {
      precent = 5;
    }
    return precent;
  }

  convertDateToTimestamp(date: Date): number {
    let ts = moment(date).valueOf();
    return ts;
  }

  convertTimestampToDate(ts: number): Date {
    let rDate = moment.unix(ts).toDate();
    return rDate;
  }

  isMoment(ts: number): boolean {
    let x = moment(ts);

    if (x.isValid()) {
      return true;
    }
    return false;
  }
}
