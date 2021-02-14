import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { CadastrarComponent } from './cadastrar.component';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/cadastrar', pathMatch: 'full' },
    { path: 'cadastrar', component: CadastrarComponent, data: { title: marker('Cadastrar') } },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes),
    FormsModule,
     ReactiveFormsModule],
  exports: [RouterModule],
  providers: [],
})
export class CadastrarRoutingModule {}
