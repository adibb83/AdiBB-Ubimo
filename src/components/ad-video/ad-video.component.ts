import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { HomeComponent } from '@pages/home/home.component';
import { IAdEvent } from 'ubimo-ad-dispatcher';

@Component({
  selector: 'app-ad-video',
  templateUrl: './ad-video.component.html',
  styleUrls: ['./ad-video.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdVideoComponent implements OnInit {
  @Input('ad-object') adObject!:IAdEvent
  public unique_key!: number;
  public parentRef!: HomeComponent;
  constructor() { }

  ngOnInit(): void {
  }

}
