import { Component, Inject, OnInit, inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Empleado } from 'src/app/Interfaces/empleado';

@Component({
  selector: 'app-dialogo-delete',
  templateUrl: './dialogo-delete.component.html',
  styleUrls: ['./dialogo-delete.component.css']
})
export class DialogoDeleteComponent implements OnInit {

  constructor(
    private dialogReferencia: MatDialogRef<DialogoDeleteComponent>,
    @Inject(MAT_DIALOG_DATA)public dataEmpelado: Empleado
  ) { }

  ngOnInit(): void {
  }

  delete_confirm(){
    if(this.dataEmpelado){
      this.dialogReferencia.close("eliminar");
    }
  }

}
