import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
  selector: 'app-ver-mascotas',
  templateUrl: './ver-mascotas.component.html',
  styleUrls: ['./ver-mascotas.component.css']
})
export class VerMascotasComponent implements OnInit {
  id:number
  mascota!:Mascota
  cargando: boolean = false

  // mascota$!:Observable<Mascota>
  // private aRoute:ActivatedRoute obtenemos el id que estamos llamando 
 
  constructor( private mascotaServices:MascotaService, private aRoute:ActivatedRoute) {

   this.id= Number(this.aRoute.snapshot.paramMap.get('id'));
 
   
   }

  ngOnInit(): void {
    // this.mascota$ = this.mascotaServices.getmascota(this.id) con esto ttabajamos con el pipe asyns
    this.vermascota();
  }

  vermascota(){
    this.cargando = true;
    this.mascotaServices.getmascota(this.id).subscribe(data=> {
      this.mascota = data
      this.cargando = false
    })
  }

}
