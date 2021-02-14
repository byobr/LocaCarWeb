import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { environment } from '@env/environment';
import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { HomeModule } from './home/home.module';
import { ShellModule } from './shell/shell.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { CadastrarModule } from './cadastrar/cadastrar.module';
import { ReservasModule } from './reservas/reservas.module';
import LocalePtBr from '@angular/common/locales/br';

@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule,
    CoreModule,
    SharedModule,
    ShellModule,
    HomeModule,
    CadastrarModule,
    ReservasModule,
    ReactiveFormsModule,
    AppRoutingModule, // must be imported as the last module as it contains the fallback route
  ],

  // the second parameter 'fr' is optional
  declarations: [AppComponent],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: LocalePtBr, useValue: 'pt-BR' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
