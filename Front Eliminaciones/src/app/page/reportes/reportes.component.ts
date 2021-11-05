import { Component, OnInit, ViewChild ,Input } from '@angular/core';
import { FormBuilder, FormGroup,Validators,FormArrayName,FormArray } from '@angular/forms';
import { ProcesosService } from 'src/app/servicios/procesos.service'
import { AgGridAngular } from 'ag-grid-angular';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {
  rowSelection;
  defaultColDef;
  rowData: any;
  grupo;fecha;
  obj;
  @ViewChild('agGrid') agGrid: AgGridAngular;


  columnDefs = [
    {headerName: 'Periodo', field: 'empperiodo', sortable: true, filter: true,resizable: true,suppressMovable:true},
    {headerName: 'Empresa', field: 'empemprsa', sortable: true, filter: true,resizable: true,suppressMovable:true},
    {headerName: 'Contraparte', field: 'empcontraparte', sortable: true, resizable: true,suppressMovable:true},
    {headerName: 'Rubro', field: 'emprubro', sortable: true, resizable: true,suppressMovable:true},
    {headerName: 'Saldo', field: 'empsaldo', sortable: true, resizable: true,suppressMovable:true},
    {headerName: 'Saldo Promedio', field: 'empsaldopromedio', sortable: true, resizable: true,suppressMovable:true},
    {headerName: '% Eliminacion', field: 'empeliminacion', sortable: true, resizable: true,suppressMovable:true},
    {headerName: 'Moneda', field: 'empmoneda', sortable: true, resizable: true,suppressMovable:true,},
    {headerName: 'Acciones', field: 'editar',cellRenderer: 'commonRenderer',
    template: `<div class="example-wrapper">
    <button
      style="margin-bottom: 10px"
      class="btn btn-primary"
    > EDITAR</div>`,width: 100},
    { headerName: '',field: 'eliminar',cellRenderer: 'commonRenderer',
    template: `<div class="example-wrapper">
    <button
      style="margin-bottom: 10px"
      class="btn btn-danger"
    > Eliminar</div>`,}
  

];





myform:FormGroup;
reportes=[];

  constructor(private mf:FormBuilder,private procesosServ:ProcesosService,) { 
    this.myform = this.mf.group({
       fecha:["",Validators.required],
       grupo:["",Validators.required],
      //  option:["",],
      //  grupo:["",]
      
     })
     this.rowData = this.procesosServ.getAll()
    //  this.rowSelection = 'single';
  }
  
  ngOnInit() {
  }

  onCellClicked($event){
    debugger
    $event.colDef.headerName
    console.log($event)
  }

  onSelectionChanged(e){
    debugger
   
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    // const selectedData = selectedNodes.map( node => node.data );
    // const selectedDataStringPresentation = selectedData.map( node => node.make + ' ' + node.model).join(', ');
     this.obj = selectedNodes
if(this.obj.length == 0)
{
  this.obj = undefined;
}else{
  this.obj =selectedNodes[0].data 
  //  console.log(this.obj)
  // this.id=this.obj.empCodigo
  // this.desc=this.obj.empDescripcion
  // this.interco=this.obj.empIntercompany
  // this.porc=this.obj.empPorcentaje
}

  }

 
  filter(){}

  generatxt(){ 
  }
  // periodoactual(){
  //   debugger
  //   this.fecha = this.datePipe.transform(this.date, 'yyyy-MM')
  //   console.log(this.fecha)
  //     debugger
  //     this.procesosServ.postProcesperido(this.fecha).subscribe((res) => {
  //        if (res){
  //           this.procesosServ.getPeriodo()
  //          .subscribe(res => {
  //           this.rowData=res
  //           debugger
  //          }, err => {
  //            console.log(err);
           
  //          });
  //        }
       
  //     })
  //  }

  //  fechaajuste(){
  //    console.log("procesos "+ this.fecha)
  //    debugger
  //    this.procesosServ.myFecha=this.fecha
    
  //  }

  //  periodo(){
  //    debugger
  //    this.fecha = this.fecha; 

 
  // }

 
}

