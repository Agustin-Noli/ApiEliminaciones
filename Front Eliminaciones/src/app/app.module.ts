import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './nav-bar/layout/layout.component';
import { ProcesosComponent } from './page/procesos/procesos.component';
import { MonedaComponent } from './page/moneda/moneda.component';
import { AjustesComponent } from './page/ajustes/ajustes.component';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './pipe/filter.pipe';
import { ImprubrosComponent } from './page/imprubros/imprubros.component';
import { ReportesComponent } from './page/reportes/reportes.component';
import { EmpresasComponent } from './page/empresas/empresas.component';
import { ImpplanillasComponent } from './page/impplanillas/impplanillas.component';
import { UsuariosComponent } from './page/usuarios/usuarios.component';
import { GruposComponent } from './page/grupos/grupos.component';
import { AgGridModule } from 'ag-grid-angular';



@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    ProcesosComponent,
    MonedaComponent,
    AjustesComponent,
    FilterPipe,
    ImprubrosComponent,
    ReportesComponent,
    EmpresasComponent,
    ImpplanillasComponent,
    UsuariosComponent,
    GruposComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([ ]),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
