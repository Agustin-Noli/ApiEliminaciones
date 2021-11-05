import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { ProcesosService } from 'src/app/servicios/procesos.service'
@Component({
  selector: 'app-imprubros',
  templateUrl: './imprubros.component.html',
  styleUrls: ['./imprubros.component.scss']
})
export class ImprubrosComponent implements OnInit {

  defaultColDef;
  rowSelection;

  @ViewChild('agGrid') agGrid: AgGridAngular;

    title = 'app';

    columnDefs = [
        {headerName: 'Rubro', field: 'ruB_CODIGO', sortable: true, filter: true, resizable: true,suppressMovable:true},
        {headerName: 'Descripcion', field: 'ruB_DESCRIPCION', sortable: true, filter: true , resizable: true,suppressMovable:true},
        {headerName: 'Signo', field: 'ruB_SIGNO', sortable: true, filter: true, resizable: true,suppressMovable:true },
        {headerName: 'Nivel', field: 'ruB_NIVEL', sortable: true, resizable: true,suppressMovable:true },
        {headerName: 'Orden', field: 'ruB_ORDEN', sortable: true, resizable: true,suppressMovable:true },
        {headerName: 'Bcra', field: 'es_BCRA', sortable: true, resizable: true,suppressMovable:true,hide:true },
        
    ];

    rowData: any;

    constructor(private http: HttpClient,private procesosServ:ProcesosService) {
    this.defaultColDef = {
      flex: 1,
      minWidth: 100,
    };

    this.rowSelection = 'single';
    }
  // RUB_CODIGO          :string,//char
  // RUB_DESCRIPCION     :string,
  // RUB_SIGNO           :string,//char
  // RUB_NIVEL           :number, //tinyint
  // RUB_ORDEN           :string,//char
  // ES_BCRA             :string //char

    ngOnInit(){
      debugger
            this.procesosServ.getRubros()
          .subscribe((data) => {
            if(data.length == 0){
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

  
    
  

}
