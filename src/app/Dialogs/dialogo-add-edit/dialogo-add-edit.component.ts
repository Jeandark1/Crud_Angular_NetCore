import { Component, Inject, OnInit, inject } from '@angular/core';

import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';

import { Departamento } from 'src/app/Interfaces/departamento';
import { Empleado } from 'src/app/Interfaces/empleado';
import { DepartamentoService } from 'src/app/Services/departamento.service';
import { EmpleadoService } from 'src/app/Services/empleado.service';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
}


@Component({
  selector: 'app-dialogo-add-edit',
  templateUrl: './dialogo-add-edit.component.html',
  styleUrls: ['./dialogo-add-edit.component.css'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue : MY_DATE_FORMATS}
  ]
})
export class DialogoAddEditComponent implements OnInit {

  formEmpleado: FormGroup;
  tituloAccion: string = 'Nuevo';
  botonAccion: string  = 'Guardar';
  listaDepartamentos: Departamento[] =[];

  constructor(
    private dialogReferencia: MatDialogRef<DialogoAddEditComponent>,
    private fb:FormBuilder,
    private _snackBar: MatSnackBar,
    private _departamentoService: DepartamentoService,
    private _empleadoService: EmpleadoService,
    @Inject(MAT_DIALOG_DATA)public dataEmpelado: Empleado
  ) { 
      
    this.formEmpleado = this.fb.group({
      nombreCompleto: ['', Validators.required],
      idDepartamento: ['',Validators.required],
      sueldo: ['',Validators.required],
      fechaContrato: ['',Validators.required]
    })

    this._departamentoService.getList().subscribe({
      next:(data)=>{
        this.listaDepartamentos = data;
      },error:(e)=>{}
    })

   }

   mostrarAlerta(msg: string, accion: string) {
    this._snackBar.open(msg, accion,{
      horizontalPosition:"end",
      verticalPosition:"top",
      duration: 3000
    });
  }
 
  addEditEmpleado(){

    console.log(this.formEmpleado);
    console.log(this.formEmpleado.value);
    const modelo: Empleado ={
      idEmpleado: 0,
      nombreCompleto: this.formEmpleado.value.nombreCompleto,
      idDepartamento: this.formEmpleado.value.idDepartamento,
      sueldo: this.formEmpleado.value.sueldo,
      fechaContrato: moment(this.formEmpleado.value.fechaContrato).format("DD/MM/YYYY")
    }
    // para que sepa que debe de crear
    if(this.dataEmpelado == null){
      this._empleadoService.add(modelo).subscribe({
        next:(data)=>{
         this.mostrarAlerta("Empleado fue Creado", "Listo");
         this.dialogReferencia.close("creado");
        },error:(e)=>{
          this.mostrarAlerta("No se pudo crear","Error")
        }
      })
    }else{
     // para que seoa que debe de editar
     this._empleadoService.update(this.dataEmpelado.idEmpleado, modelo).subscribe({
      next:(data)=>{
       this.mostrarAlerta("Empleado fue Editado", "operacion Exitosa");
       this.dialogReferencia.close("editado");
      },error:(e)=>{
        this.mostrarAlerta("No se pudo editar","Error")
      }
    })
    }

    
    
  }



  ngOnInit(): void {
     if(this.dataEmpelado){
        this.formEmpleado.patchValue({
          nombreCompleto: this.dataEmpelado.nombreCompleto,
          idDepartamento: this.dataEmpelado.idDepartamento,
          sueldo: this.dataEmpelado.sueldo,
          fechaContrato: moment(this.dataEmpelado.fechaContrato, 'DD/MM/YYYY') 
        })
        this.tituloAccion = "Editar";
        this.botonAccion = "Actualizar";
     }
  }
}
