import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { RowNode } from 'ag-grid-community';
import { ProcesosService } from 'src/app/servicios/procesos.service';
@Component({
  selector: 'app-impplanillas',
  templateUrl: './impplanillas.component.html',
  styleUrls: ['./impplanillas.component.scss']
})
export class ImpplanillasComponent implements OnInit {
  defaultColDef;
  rowSelection;
  @ViewChild('agGrid') agGrid: AgGridAngular;

    title = 'app';

    columnDefs = [
        {headerName: 'Codigo', field: 'EMP_CODIGO', sortable: true , resizable: true,suppressMovable:true},
        {headerName: 'Empresa', field: 'EMP_DESCRIPCION', sortable: true , resizable: true,suppressMovable:true},
        {headerName: 'Periodo', field: 'PERIODO', sortable: true, filter: true, resizable: true,suppressMovable:true},
        {headerName: 'Nombre Planilla', field: 'NOMBRE_PLANILLA', sortable: true, filter: true, resizable: true,suppressMovable:true },
        {headerName: 'Grupo', field: 'GRUPO', sortable: true, filter: true , resizable: true,suppressMovable:true},
        {headerName: 'Porcentaje', field: 'PORCENTAJE', sortable: true , resizable: true,suppressMovable:true}

        // EMP_CODIGO          :number,
        // EMP_DESCRIPCION     :string,
        // PERIODO             :string, //(char)
        // NOMBRE_PLANILLA     :string,
        // GRUPO               :string,
        // PORCENTAJE          :string
    ];

    rowData: any;

    constructor(private http: HttpClient,private procesosServ:ProcesosService) {
      this.defaultColDef = {
        flex: 1,
        minWidth: 100,
      };
      this.rowSelection = 'single';
    }

    ngOnInit() {
      debugger
    this.procesosServ.getimpPlanillas()
  .subscribe((data) => {
    if(data.length == 0){
      // alert('no hay data para  mostar');
    console.log(this.rowData);
    }else{
      this.rowData =data
      console.log(this.rowData);
        }
      } 
  );

}




    onSelectionChanged(e){
      const selectedNodes = this.agGrid.api.getSelectedNodes();
      // const selectedData = selectedNodes.map( node => node.data );
      // const selectedDataStringPresentation = selectedData.map( node => node.make + ' ' + node.model).join(', ');

      console.log(selectedNodes[0].data)
      // selectedNodes[0].data['make']
    }

  
    periodoplanilla(){
        // fecha a seleccionar

    }
  }


