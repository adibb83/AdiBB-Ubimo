import { Injectable } from '@angular/core';
import {adDispatcher, IAdEvent} from 'ubimo-ad-dispatcher'
import { Observable } from 'ubimo-ad-dispatcher/node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})

export class AddsService {


  public adDispatcher$:Observable<IAdEvent>= adDispatcher.adEvents$;
  constructor(){}

    startListeningToEvents(){
      adDispatcher.adEvents$.subscribe(ad => {
        console.log(ad);
      })
}

getFilterdList():Observable<IAdEvent> {
  return this.adDispatcher$;
}
}
