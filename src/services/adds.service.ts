import { Injectable } from '@angular/core';
import { adDispatcher, IAdEvent } from 'ubimo-ad-dispatcher';
import { Observable } from 'ubimo-ad-dispatcher/node_modules/rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class AddsService {
  public adDispatcher$: Observable<IAdEvent> = adDispatcher.adEvents$;
  constructor() {}

  startListeningToEvents() {
    adDispatcher.adEvents$.subscribe((ad) => {
      console.log(ad);
    });
  }

  getFilterdList(): Observable<IAdEvent> {
    return this.adDispatcher$;
  }

  calcAddPosition(parentWidth: number, coordinate: number): number {
    let precent = 0;
    precent = (100 * coordinate) / parentWidth;
    if (precent < 4) {
      precent = 5;
    }
    return precent;
  }

  convertDateToTimestamp(date: Date): number {
    let ts = moment(date).unix();
    return ts;
  }

  convertTimestampToDate(ts: number): Date {
    let rDate = moment.unix(ts).toDate();
    return rDate;
  }
}
