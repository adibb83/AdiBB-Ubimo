import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  AfterViewInit,  } from '@angular/core';
import { HomeComponent} from '@pages/home/home.component';
import { interval, timer } from 'rxjs';
import {ICreative,IAdEvent} from 'ubimo-ad-dispatcher'

@Component({
  selector: 'app-ad-image',
  templateUrl: './ad-image.component.html',
  styleUrls: ['./ad-image.component.scss']
})
export class AdImageComponent implements OnInit {

  @Input('ad-object') adObject!:IAdEvent
  public unique_key!: number;
  public parentRef!: HomeComponent;
  progress:number = 20;
  positionX = 0;
  positionY = 0;
  counter:any;
  constructor() { }

  ngOnInit(): void {
    this.positionX = 100*this.adObject.coordinates.x/this.parentRef.offSetWidth
    this.positionY = 100*this.adObject.coordinates.y/this.parentRef.offSetHight
    this.startTimer();
  }


  removeComponent() {
    this.parentRef.remove(this.unique_key)
  }

  startTimer() {
    const source = interval(1000);
    source.subscribe(val=> {
      console.log(val)
      this.progress= this.progress + 20;
      if(val > 5){
        this.removeComponent()
      }
    })
  }

}
