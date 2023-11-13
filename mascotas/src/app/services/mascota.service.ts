import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mascota } from '../interfaces/mascota';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {
// recordemos que los servicios basicamente se usan para tres cosas
// 1 para hacer las peticiones hacia algun backend
// 2 otra para reutilizacion de codigo
// 3 comunicacion entre componentes
 private myAppUrl: string = environment.urlApi;
 private myApiUrl: string = 'api/comunicador/'; // esta es la nueva
 private myApiUrl1: string = 'api/mascota/'; // esta era la anterior
  constructor( private http:HttpClient) { }

  // esta funcion es para obtener todos las mascotas de la base de datos
  getMascotas():Observable<Mascota[]>{
    // this.http.get(this.myAppUrl + this.myApiUrl)//esta es una forma de usarla o hacer le llamado
   return this.http.get<Mascota[]>(`${this.myAppUrl}${this.myApiUrl}`); //esta la forma mas usada
  }

  //con esta funcion obtengo una mascota por su id
  getmascota(id:number):Observable<Mascota>{
   return this.http.get<Mascota>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }
  //servicio para eliminar una mascota
  deleteMascota(id:number):Observable<void>{
   return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  //servicio para agregar mascotas
  addMascota(mascota:Mascota):Observable<Mascota>{
  return this.http.post<Mascota>(`${this.myAppUrl}${this.myApiUrl}`, mascota)
  }


  //servicio de actualizar
  updateMascota(id:number, mascota:Mascota):Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, mascota)
  }



}
