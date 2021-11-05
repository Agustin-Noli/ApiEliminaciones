import { Component, OnInit, ViewChild ,Input } from '@angular/core';
import { FormBuilder, FormGroup,Validators,FormArrayName,FormArray } from '@angular/forms';
import { ProcesosService } from 'src/app/servicios/procesos.service'
import { AgGridAngular } from 'ag-grid-angular';
import { DatePipe } from '@angular/common'; //EMI
@Component({
  selector: 'app-procesos',
  templateUrl: './procesos.component.html',
  styleUrls: ['./procesos.component.scss'],
  providers: [DatePipe] //EMI
})


export class ProcesosComponent implements OnInit {
  rowSelection;
  defaultColDef
  showModal:boolean=false;
  showModeleliminar:boolean=false;
  showModelmodificar:boolean=false;
  showMsjemp:boolean=false;
  showMsj:boolean=false;
  showconf:boolean=false;
  showMsjemp1:boolean=false;
  showMsjmod:boolean=false;
  showconfr:boolean=false;

   id='';
   desc='';
   porc='';
   interco='';obj;

  porcenjate ="";  descripcion="";interc="";  msjelim="";  msjelim1="";  title="";

  txt;calculo;

  // PRUEBA CAMPO FECHA
  fecha;
  rfecha;
  fec:any;
  newmyModel;
  date = new Date(); //EMI
  prueba=[];

  @ViewChild('agGrid') agGrid: AgGridAngular;

  
  columnDefs = [
      {headerName: 'Codigo Empresa', field: 'empCodigo', sortable: true, filter: true,resizable: true,suppressMovable:true,hide:true},
      {headerName: 'Empresa', field: 'empDescripcion', sortable: true, filter: true,resizable: true,suppressMovable:true },
      {headerName: 'Periodo', field: 'periodo',   sortable: true, resizable: true,suppressMovable:true},
      {headerName: 'Codigo Rubro', field: 'rubCodigo',   sortable: true, resizable: true,suppressMovable:true},
      {headerName: 'Rubro', field: 'rubDescripcion',   sortable: true, resizable: true,suppressMovable:true},
      {headerName: 'Concepto', field: 'concepto',   sortable: true, resizable: true,suppressMovable:true},
      {headerName: 'Codigo Contraparte', field: 'empCodigoContraparte',   sortable: true, resizable: true,suppressMovable:true,hide:true},
      {headerName: 'Contraparte', field: 'empDescripcionContraparte',   sortable: true, resizable: true,suppressMovable:true},
      {headerName: 'Codigo Moneda', field: 'monCodigo',   sortable: true, resizable: true,suppressMovable:true,hide:true},
      {headerName: 'Moneda', field: 'monDescripcion',   sortable: true, resizable: true,suppressMovable:true},
      {headerName: 'Saldo', field: 'saldo',   sortable: true, resizable: true,suppressMovable:true},
      {headerName: 'Saldo Promedio', field: 'saldoPromedio',   sortable: true, resizable: true,suppressMovable:true},
      {headerName: 'Ind', field: 'ind',   sortable: true, resizable: true,suppressMovable:true,hide:true},
      {headerName: 'Pond', field: 'pond',   sortable: true, resizable: true,suppressMovable:true,hide:true},
      {headerName: 'Exposicion', field: 'exposicion',   sortable: true, resizable: true,suppressMovable:true,hide:true},
      
  ];



  rowData: any;
  // private http: HttpClient,
  constructor(private procesosServ:ProcesosService,private datePipe: DatePipe) {
 
    this.defaultColDef = {
      flex: 1,
      minWidth: 100,
    };

    this.rowSelection = 'single';
    debugger
    this.fecha = this.datePipe.transform(this.date, 'yyyy-MM')

      this.periodoactual();
   // this.rowData= this.procesosServ.getProceso();
    }
 
  ngOnInit() {
    
    this.procesosServ.getPeriodo()
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

  periodoactual(){
    debugger
    this.fecha = this.datePipe.transform(this.date, 'yyyy-MM') //EMI
   //this.fecha = this.datePipe.transform(this.date, 'MM-yyyy')
   
   
  this.rfecha=this.fecha.split(" ")[0].split("-").reverse().join("-");
   
     this.fec =  this.rfecha.replace("-", "")
    console.log( this.fec)
      debugger
      this.procesosServ.getPeriodo()
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

   fechaajuste(){
     console.log("procesos "+ this.fec)
     debugger
     this.procesosServ.myFecha=this.fec
    
   }

   periodo(){
     debugger
     this.fecha = this.fecha; 
  //    this.procesosServ.postProcesperido(this.myModel).subscribe((res) => {
  //     if (res){
  //        this.procesosServ.getPeriodo()
  //       .subscribe(res => {
  //        this.rowData=res
  //        debugger
  //       }, err => {
  //         console.log(err);
        
  //       });
  //     }
    
  //  })
  //}
 
  }


}