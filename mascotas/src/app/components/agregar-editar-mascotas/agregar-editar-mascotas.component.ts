import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
  selector: 'app-agregar-editar-mascotas',
  templateUrl: './agregar-editar-mascotas.component.html',
  styleUrls: ['./agregar-editar-mascotas.component.css']
})
export class AgregarEditarMascotasComponent implements OnInit {

  cargando:boolean = false
  formulario: FormGroup
  id:number;
  operacion: string = 'Agregar'
  constructor( private fb:FormBuilder,
               private mascotaService:MascotaService,
               private _snackBar: MatSnackBar,
               private router:Router,
               private aRoute:ActivatedRoute
             ) { 

    this.formulario = this.fb.group({
      nombre:['', Validators.required],
      raza:['', Validators.required],
      color:['', Validators.required],
      edad:['', Validators.required],
      peso:['', Validators.required],
    })

    this.id = Number(this.aRoute.snapshot.paramMap.get('id'))
    
  }

  ngOnInit(): void {
    if (this.id != 0) {
      this.operacion = 'Editar'
      this.obtenerMascota(this.id)
    }
  }

  obtenerMascota(id:number){
    this.cargando = true
    this.mascotaService.getmascota(id).subscribe(data => {
      this.formulario.setValue({
        nombre: data.nombre,
        raza: data.raza,
        color: data.color,
        edad: data.edad,
        peso: data.peso
      })
      this.cargando= false
      
    })
  }

  agregarEditarMascota(){
    // const nombre = this.formulario.get('nombre')?.value
    // const nombre = this.formulario.value.nombre
    
    const mascota: Mascota = {
      nombre:  this.formulario.value.nombre,
      raza:  this.formulario.value.raza,
      color:  this.formulario.value.color,
      edad:  this.formulario.value.edad,
      peso: this.formulario.value.peso
    }

      if (this.id !=0) {
        mascota.id = this.id
        this.editarMascota(this.id, mascota)
      }else{
        this.agregarmascota(mascota)
      }
    
  }

  agregarmascota(mascota:Mascota){
      //Enviamos objeto al back-end
      this.mascotaService.addMascota(mascota).subscribe(data =>{
        this.mensajeExito('registrada');
        this.router.navigate(['/listMascotas']); 
        
        
      })
  }

  editarMascota(id:number, mascota:Mascota){
    this.cargando = true
    this.mascotaService.updateMascota(id,mascota).subscribe(() =>{
      this.mensajeExito('editada');
      this.router.navigate(['/listMascotas']); 
      this.cargando= false
    })
  }

  mensajeExito(texto:string){
    this._snackBar.open(`la mascota fue ${texto}con exito con exito`, '',{
      duration: 3000,
      horizontalPosition:'right'
    });
  }





}
