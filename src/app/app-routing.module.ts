import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdsPageComponent } from '@pages/ads-page/ads-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/ads-page',
    pathMatch: 'full',
  },
  {
    path: 'ads-page',
    component: AdsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
