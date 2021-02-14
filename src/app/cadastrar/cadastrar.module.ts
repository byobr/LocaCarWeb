import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '@shared';
import { MaterialModule } from '@app/material.module';
import { CadastrarRoutingModule } from './cadastrar-routing.module';
import { CadastrarComponent } from './cadastrar.component';
import { FiltrarCarroPorCategoria } from '@app/util/filtrarCarroPorCategoria.pipe';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    CadastrarRoutingModule,
    FormsModule,
  ],
  declarations: [CadastrarComponent],
})
export class CadastrarModule {}
