import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ReservasComponent } from './reservas.component';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/reservas', pathMatch: 'full' },
    { path: 'reservas', component: ReservasComponent, data: { title: marker('Reservas') } },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes), FormsModule, ReactiveFormsModule],
  exports: [RouterModule],
  providers: [],
})
export class ReservasRoutingModule {}
