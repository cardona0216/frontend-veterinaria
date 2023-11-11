import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Componentes
import { ListadoMascotasComponent } from './components/listado-mascotas/listado-mascotas.component';
import { AgregarEditarMascotasComponent } from './components/agregar-editar-mascotas/agregar-editar-mascotas.component';
import { VerMascotasComponent } from './components/ver-mascotas/ver-mascotas.component';

const routes: Routes = [
  { path: '', redirectTo: 'listMascotas', pathMatch:'full'},
  { path: 'listMascotas', component: ListadoMascotasComponent },
  { path: 'agregarMascotas', component: AgregarEditarMascotasComponent},
  { path: 'verMascota/:id', component: VerMascotasComponent},
  { path: 'editarMascota/:id', component: AgregarEditarMascotasComponent},
  { path: '**',  redirectTo: 'listMascotas', pathMatch:'full'}
]

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports:[ RouterModule ]
})
export class AppRoutingModule { }
