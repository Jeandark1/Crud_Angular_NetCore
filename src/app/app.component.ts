import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

import { Empleado } from './Interfaces/empleado';
import { EmpleadoService } from './Services/empleado.service';

// eliminar
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogoDeleteComponent } from './Dialogs/dialogo-delete/dialogo-delete.component';



import { HttpClient } from '@angular/common/http';
import { MatDialog} from '@angular/material/dialog';
import { DialogoAddEditComponent } from './Dialogs/dialogo-add-edit/dialogo-add-edit.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit{
  displayedColumns: string[] = ['NombreCompleto', 'Departamento', 'Sueldo','FechaContrato','Acciones'];
  dataSource = new MatTableDataSource<Empleado>();

  constructor(
    private http: HttpClient,
    private _empleadoServicio : EmpleadoService,
    public dialog: MatDialog,
    // aletas
    private _snackBar: MatSnackBar
  ){
    
  }

 ngOnInit(): void {
   this.mostrarEmpleados();
 }


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  mostrarEmpleados(){
    this._empleadoServicio.getList().subscribe({
      next:(dataResponse) => {
        console.log(dataResponse);
        this.dataSource.data = dataResponse;
      },error:(e) => {}
     })
  }

  // MODALES AGREGAR NUEVO

  dialogoNuevoEmpleado() {
    this.dialog.open(DialogoAddEditComponent,{
      disableClose:true,
      width: "350px"
    }).afterClosed().subscribe(result => {
      if(result === "creado")
        this.mostrarEmpleados();
      //console.log(`Dialog result: ${result}`);
    });
  }
   
  // EDITAR EMPLEADO

  dialogoEditarEmpleado(dataEmpleado: Empleado) {
    this.dialog.open(DialogoAddEditComponent,{
      disableClose:true,
      width: "350px",
      data:dataEmpleado
    }).afterClosed().subscribe(result => {
      if(result === "editado")
        this.mostrarEmpleados();
      //console.log(`Dialog result: ${result}`);
    });
  }

  // MOSTRAR ALERTA ELIMINAR EMPLEADO

  mostrarAlerta(msg: string, accion: string) {
    this._snackBar.open(msg, accion,{
      horizontalPosition:"end",
      verticalPosition:"top",
      duration: 3000
    });
  }

  dialogoEliminarEmpleado(dataEmpleado: Empleado){
    this.dialog.open(DialogoDeleteComponent,{
      disableClose:true,
      data:dataEmpleado
    }).afterClosed().subscribe(result => {
      if(result === "eliminar")
          this._empleadoServicio.delete(dataEmpleado.idEmpleado).subscribe({
           next:(data)=> {
              this.mostrarAlerta("Empleado fue eliminado", "Listo");
              this.mostrarEmpleados();
           },error:(e)=>{
              this.mostrarAlerta("Empleado no pudo ser eliminado", "Error");
              console.log(e);
           }

        })
    });
  }

}







export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];
