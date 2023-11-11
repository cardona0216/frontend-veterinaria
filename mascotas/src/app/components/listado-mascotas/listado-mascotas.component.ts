import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { error } from 'console';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';



// const ListMascotas: Mascota[] = [
// { nombre: 'Ciro', edad:3, raza:'golden', color:'Dorado', peso:20 },
// { nombre: 'Cuter', edad:12, raza:'lobo', color:'Blanco', peso:21 },
// { nombre: 'luna', edad:4, raza:'criolla', color:'Dorado', peso:23 },
// { nombre: 'mafu', edad:6, raza:'Freispuder', color:'Negro', peso:30 },
// { nombre: 'Canela', edad:5, raza:'bull', color:'Canela', peso:19 },
// { nombre: 'Pancha', edad:1, raza:'pomeraña', color:'Beix', peso:23 },
// { nombre: 'Manchas', edad:7, raza:'criollo', color:'manchas', peso:6 },
// { nombre: 'lupe', edad:13, raza:'esnauzer', color:'blanco', peso:17 }

// ];
@Component({
  selector: 'app-listado-mascotas',
  templateUrl: './listado-mascotas.component.html',
  styleUrls: ['./listado-mascotas.component.css']
})
export class ListadoMascotasComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['nombre', 'edad', 'raza', 'color', 'peso', 'acciones'];
  dataSource = new MatTableDataSource<Mascota>();
  cargando: boolean = false

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
 
  constructor(private _snackBar: MatSnackBar, private mascotasServices:MascotaService) { }

  ngOnInit(): void {
    this.obtenerMascotas();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.dataSource.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = 'Items por pagina'
      
    }
  
  }

  obtenerMascotas(){
    this.cargando = true;
    this.mascotasServices.getMascotas().subscribe(data =>{
      this.cargando= false;
     this.dataSource.data = data
    })
  }

  // obtenerMascotas(){
  //   this.cargando = true;
  //   this.mascotasServices.getMascotas().subscribe({
  //     next: (data) => {
  //        this.cargando= false;
  //        this.dataSource.data = data
  //    },
  //     error: (e) => this.cargando = false,
  //     complete: () => console.info('complete') 
  // })
  // }

  eliminarmascota(id:number){
    this.cargando = true
    this.mascotasServices.deleteMascota(id).subscribe(data => {
      this.mensajeExito();
      this.cargando = false;
      this.obtenerMascotas();
    })


    // setTimeout(()=>{
    //   this.cargando = false
    //   this._snackBar.open('la mascota fue elimina con exito', '',{
    //     duration: 3000,
    //     horizontalPosition:'right'
    //   });
    // }, 3000)
  
    
  }

  mensajeExito(){
    this._snackBar.open('la mascota fue elimina con exito', '',{
      duration: 3000,
      horizontalPosition:'right'
    });
  }

}
