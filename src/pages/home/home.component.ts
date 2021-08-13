import {
  ComponentRef,
  ComponentFactoryResolver,
  ViewContainerRef,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { AddsService } from '@services/adds.service';
import { Observable } from 'ubimo-ad-dispatcher/node_modules/rxjs';
import { IAdEvent, adDispatcher } from 'ubimo-ad-dispatcher';
import { AdImageComponent } from '@components/ad-image/ad-image.component';
import { AdVideoComponent } from '@components/ad-video/ad-video.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, AfterViewInit {
  public addList: IAdEvent[] = [];
  public filterdAdList$: Observable<IAdEvent> = adDispatcher.adEvents$;
  startTime!: string;
  endTime!: string;
  offSetWidth: number = 0;
  offSetHight: number = 0;
  @ViewChild('main') refMain!: ElementRef;
  @ViewChild('viewContainerRef', { read: ViewContainerRef })
  VCR!: ViewContainerRef;
  child_unique_key: number = 0;
  componentsReferences = Array<
    ComponentRef<AdImageComponent> | ComponentRef<AdVideoComponent>
  >();

  constructor(
    public addService: AddsService,
    private cdr: ChangeDetectorRef,
    private CFR: ComponentFactoryResolver
  ) {
    adDispatcher.adEvents$.subscribe((ad) => {
      console.log(ad);
      this.createComponent(ad);
      this.addList.unshift(ad);
      this.cdr.detectChanges();
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.offSetWidth = this.refMain.nativeElement.offsetWidth;
    this.offSetHight = this.refMain.nativeElement.offsetHeight;
    console.log(this.offSetWidth, this.offSetHight);
  }

  createComponent(add: IAdEvent) {
    let componentFactory =
      add.type == 'IMAGE'
        ? this.CFR.resolveComponentFactory(AdImageComponent)
        : this.CFR.resolveComponentFactory(AdVideoComponent);

    let childComponentRef = this.VCR.createComponent(componentFactory);

    let childComponent = childComponentRef.instance;
    childComponent.unique_key = ++this.child_unique_key;
    childComponent.adObject = add;
    childComponent.parentRef = this;

    // add reference for newly created component
    this.componentsReferences.push(childComponentRef);
  }

  remove(key: number) {
    let componentRef = this.componentsReferences.findIndex(
      (x) => x.instance.unique_key == key
    );

    console.log('ref', componentRef);

    // let vcrIndex: number = this.VCR.indexOf(componentRef as any);

    // removing component from container
    this.VCR.remove(componentRef);

    // removing component from the list
    this.componentsReferences = this.componentsReferences.filter(
      (x) => x.instance.unique_key !== key
    );
  }
}
