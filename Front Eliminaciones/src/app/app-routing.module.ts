import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProcesosComponent  } from './page/procesos/procesos.component';
import { MonedaComponent } from './page/moneda/moneda.component';
import { LayoutComponent } from './nav-bar/layout/layout.component';
import { AjustesComponent } from './page/ajustes/ajustes.component';
import { ImprubrosComponent } from './page/imprubros/imprubros.component'
import { ReportesComponent} from './page/reportes/reportes.component'
import { EmpresasComponent } from './page/empresas/empresas.component'
import { UsuariosComponent } from './page/usuarios/usuarios.component'
import { ImpplanillasComponent } from './page/impplanillas/impplanillas.component' 
import { GruposComponent } from './page/grupos/grupos.component'


const routes: Routes = [
  {path:'inicio',component:LayoutComponent},
  {path:'Procesos',component:ProcesosComponent},
  {path:'Moneda',component:MonedaComponent},
  {path:'Ajustes',component:AjustesComponent},
  {path:'Rubros',component:ImprubrosComponent},
  {path:'Reportes',component:ReportesComponent},
  {path:'Empresas',component:EmpresasComponent},
  {path:'Usuarios',component:UsuariosComponent},
  {path:'Implanillas',component:ImpplanillasComponent},
  {path:'Grupos',component:GruposComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
