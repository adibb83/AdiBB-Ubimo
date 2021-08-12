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
      this.adDispatcher$.subscribe(ad => {
        console.log(ad)
      })
}

}
