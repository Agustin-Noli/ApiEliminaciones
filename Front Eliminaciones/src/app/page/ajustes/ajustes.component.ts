import { Component, OnInit, ViewChild,Input  } from '@angular/core';
import { FormBuilder, FormGroup,Validators,FormArrayName,FormArray} from '@angular/forms';
import { ProcesosService } from 'src/app/servicios/procesos.service'
import { AgGridAngular } from 'ag-grid-angular';
 @Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.scss']
})
export class AjustesComponent implements OnInit {
  rowSelection;
  defaultColDef;
  showModal:boolean=false;
  showModeleliminar:boolean=false;
  showModelmodificar:boolean=false;
  showMsjemp:boolean=false;
  showMsj:boolean=false;
  showconf:boolean=false;
  showMsjemp1:boolean=false;
  showMsjmod:boolean=false;
  showconfr:boolean=false;
  success:boolean=false;
  empresa: any;
  rowData: any;
  rubros: any;
   id='';
   desc='';
   porc='';
   interco='';obj;
   datos;
   datosg;
   empCodigo;
   rubDescripcion;
   empCodigoContraparte;
  porcenjate ="";  descripcion="";interc="";  msjelim="";  msjelim1="";  title="";
 empselect:number;

  //prueba fecha proceso
  fecha:string ;

  prueba=[];

  @ViewChild('agGrid') agGrid: AgGridAngular;

  
  columnDefs = [
      {headerName: 'Codigo', field: 'empCodigo', sortable: true, filter: true,resizable: true,suppressMovable:true,hide:true},
      {headerName: 'Empresa', field: 'empDescripcion', sortable: true, filter: true,resizable: true,suppressMovable:true},
      {headerName: 'Periodo', field: 'periodo', sortable: true, resizable: true,suppressMovable:true},
      {headerName: 'Rubro', field: 'rubCodigo', sortable: true, resizable: true,suppressMovable:true},
      {headerName: 'Descripcion', field: 'rubDescripcion', sortable: true, resizable: true,suppressMovable:true},
      {headerName: 'Codigo Contraparte', field: 'empCodigoContraparte', sortable: true, resizable: true,suppressMovable:true,hide:true},
      {headerName: 'Contraparte', field: 'empDescripcionContraparte', sortable: true, resizable: true,suppressMovable:true},
      {headerName: 'Saldo', field: 'ajuSaldo', sortable: true, resizable: true,suppressMovable:true},
      {headerName: 'Saldo Promedio', field: 'ajuSaldoPromedio', sortable: true, resizable: true,suppressMovable:true}



  ];

  // private http: HttpClient,
  myformA:FormGroup
  myformM:FormGroup
  constructor(private procesosServ:ProcesosService,private a:FormBuilder,private m:FormBuilder) {
    this.myformA = this.a.group({
      empresa:["",Validators.required],
      periodo:["",Validators.required],
      rubro:[""],
      contraparte:[2,Validators.required],
      saldo:["",Validators.required],
      saldopromedio:["",Validators.required]

    });
    this.myformM= this.m.group({
      empresam:["",Validators.required],
      periodom:["",Validators.required],
      rubrom:[""],
      contrapartem:[,Validators.required],
      saldom:["",Validators.required],
      saldopromediom:["",Validators.required]
    });
    this.defaultColDef = {
      flex: 1,
      minWidth: 100,
    };
    this.rowSelection = 'single';
    //datos prueba.
    this.rowData= this.procesosServ.getProceso(this.procesosServ.myFecha);
    console.log("ajustes "+ this.procesosServ.myFecha)
    debugger
    }

  ngOnInit() {

    // this.procesosServ.getAju()
    // .subscribe((data) => {
    //  if(data.length != 0){
    //   this.rowData =data
    //       }       
    //     } 
    // );

    

     debugger
     this.procesosServ.getEmpbyperiodo()
   .subscribe((data) => {
    if(data.length != 0){
      this.empresa =data
         }         
       } 
   );

   this.procesosServ.getRubros()
   .subscribe((data) => {
    if(data.length != 0){
      this.rubros =data
      
         }
      }
   );
   this.procesosServ.getEmp()
   .subscribe((data) => {
    if(data.length != 0){
      this.empresa =data
    
      console.log(this.empresa)
         }
      }
   );
this.empselect =46
console.log(this.empselect)
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
  console.log(this.obj)


  this.empCodigo=this.obj.empCodigo
  this.myformM.value.empresam =this.obj.empDescripcion
  this.myformM.value.periodom =this.obj.periodo
  this.myformM.value.rubrom =this.obj.rubCodigo
  this.rubDescripcion=this.obj.rubDescripcion
  this.empCodigoContraparte =this.obj.empDescripcionContraparte
  this.myformM.value.contrapartem =this.obj.empDescripcionContraparte
  this.myformM.value.saldom =this.obj.ajuSaldo
  this.myformM.value.saldopromediom =this.obj.ajuSaldoPromedio
 
}
    
  }


  showModel(){
    this.title ='Agregar'
    this.showModal =true;
    this.showMsjemp= true; 
    debugger

  }
  onChange(){
    console.log(this.empresa)
    
    }
  
  showModele(){
    if(this.obj == undefined){
      
      this.title ='Atencion';
        this.showModeleliminar  = true; 
        this.showMsjemp= true;
        this.showMsjemp1=false;
        this.msjelim = "Debe seleccionar una Empresa";
       
    }else{

   
      debugger
      this.title ="Eliminar";
      this.showModeleliminar=true;
      this.showMsj  = true;
      this.showconf = true;
      this.showMsjemp=false;
      this.showMsjemp1=true;
      this.msjelim1 = "¿Desea eliminar el ajuste "
      
   }
  }

  enviaelim(){
    console.log(this.obj)
    this.procesosServ.deleteAju(this.obj).subscribe((id) => {
     
      if (id == id){
        debugger
         this.procesosServ.getAju()
         
        .subscribe(res => {
         this.rowData=res
          
         this.showModeleliminar  = false; 
            this.myformA.reset();
            this.obj = undefined
        }, err => {
          console.log(err);
        
        });
      }
    
   })

  }
  enviar(){
    console.log(this.myformA.value)
    console.log('llegue')
  }
  showModelm(){
    console.log(this.obj)
    debugger
    if(this.obj == undefined){ 
      this.title ='Atencion';
      this.showModelmodificar  = true; 
      this.showMsjemp= true;
      this.showMsjmod=false;
      this.showconfr=false;
      this.msjelim = "Debe seleccionar una Empresa"
    } else{
    debugger
    this.title ="Modificar";
    this.showModelmodificar=true;
    this.showMsjmod = true;
    this.showMsjemp = false;
    this.showconfr=true;

      }
 }



  enviamod() { 

  console.log(this.myformM.value)
  let  desc =((this.myformM.value.empresam == null || this.myformM.value.empresam == "") ?  this.obj.emP_DESCRIPCION: this.myformM.value.empresam );
  let  intrc =((this.myformM.value.intercompanym == null || this.myformM.value.intercompanym == "") ? this.obj.emP_INTERCOMPANY :this.myformM.value.intercompanym );
  let porc =((this.myformM.value.porcentajem  ==  null || this.myformM.value.porcentajem == "") ?  this.obj.emP_PORCENTAJE :this.myformM.value.porcentajem );


    var  data ={  
    "emP_CODIGO": 45,
    "emP_DESCRIPCION":  desc,
    "emP_INTERCOMPANY": intrc,
    "emP_PORCENTAJE": porc,
     "seC_CODIGO":1
     }
     debugger

  // this.procesosServ.putEmp(data).subscribe((res) => {
  //    if (res == res){
  //       this.procesosServ.getEmp()
  //      .subscribe(res => {
  //       this.rowData=res
  //       debugger
  //        this.successm =true;       
  //        setTimeout(()=>{ 
  //         this.empresam="";
  //         this.intercompanym="";
  //         this.porcentajem="";
  //         this.obj = undefined
  //         this.myformM.reset()
  //          this.showModelmodificar= false; 
  //        }, 1500);
    
  //      }, err => {
  //        console.log(err);
       
  //      });
  //    }
   
  // })

  } 


}
