import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { HttpClient } from '@angular/common/http';
import { ProcesosService } from 'src/app/servicios/procesos.service'
@Component({
  selector: 'app-moneda',
  templateUrl: './moneda.component.html',
  styleUrls: ['./moneda.component.scss']
})
export class MonedaComponent implements OnInit {
  defaultColDef;
  rowSelection;
  showModal:boolean=false;
  showModeleliminar:boolean=false;
  showModelmodificar:boolean=false;
  select;
  id;
  porc;
  obj;
  porcenjate ;
  descripcion;
  @ViewChild('agGrid') agGrid: AgGridAngular;

  title = 'app';
  // 
  columnDefs = [
      {headerName: 'Codigo', field: 'moN_CODIGO', sortable: true, filter: true,hide:true},
      {headerName: 'Moneda', field: 'moN_DESCRIPCION', sortable: true, filter: true, resizable: true,suppressMovable:true },
      {headerName: 'Cotizacion', field: 'moN_COTIZACION', sortable: true, resizable: true,suppressMovable:true}
  ];

  rowData: any;

  constructor(private http: HttpClient,private procesosServ:ProcesosService) {
    this.defaultColDef = {
      flex: 1,
      minWidth: 100,
    };

    this.rowSelection = 'single';
  }

  // ngOnInit() {
  //     this.rowData = this.http.get('https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/sample-data/smallRowData.json');
  // }

  ngOnInit(){
    debugger
          this.procesosServ.getMoneda()
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


    this.obj =selectedNodes[0].data
      console.log(this.obj.moN_CODIGO)
  }






}
