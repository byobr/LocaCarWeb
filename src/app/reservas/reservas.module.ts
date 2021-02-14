import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '@shared';
import { MaterialModule } from '@app/material.module';
import { ReservasComponent } from './reservas.component';
import { ReservasRoutingModule } from './reservas-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    ReservasRoutingModule,
    FormsModule,
  ],
  declarations: [ReservasComponent],
})
export class ReservasModule {}
