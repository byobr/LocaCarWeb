import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, data: { title: marker('Home') } },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes), FormsModule, ReactiveFormsModule],
  exports: [RouterModule],
  providers: [],
})
export class HomeRoutingModule {}
