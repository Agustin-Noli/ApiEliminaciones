import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ProcesosService } from 'src/app/servicios/procesos.service'
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.scss']
})
export class EmpresasComponent implements OnInit  {  
 

  //Variables
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
  success:boolean=false;
  successm:boolean=false;
   id='';   descripcion="";  msjelim="";  msjelim1="";  title="";
   obj;
   desc='';
   empresa='';
   //Variables Form modificacion
   empresam='';
   intercompanym='';
   porcentajem='';
   seC_CODIGO='';

  myModal;
  @ViewChild('agGrid') agGrid: AgGridAngular;

  
  columnDefs = [
      {headerName: 'Codigo', field: 'emP_CODIGO', sortable: true, filter: true,hide:true},
      {headerName: 'Empresa', field: 'emP_DESCRIPCION',width: 391, sortable: true, filter: true,resizable: true,suppressMovable:true },
      {headerName: 'Intercompany', field: 'emP_INTERCOMPANY',width: 391, sortable: true, resizable: true,suppressMovable:true},
      {headerName: 'Porcentaje', field: 'emP_PORCENTAJE',width: 391, sortable: true, resizable: true,suppressMovable:true},
      {headerName: 'Sec_codigo', field: 'seC_CODIGO',width: 391, sortable: true, resizable: true,suppressMovable:true,hide:true}
     
  ];
 
  rowData: any;
  // private http: HttpClient,

  myformA:FormGroup
  myformM:FormGroup
  constructor(private procesosServ:ProcesosService,private a:FormBuilder,private m:FormBuilder ) {
     this.myformA = this.a.group({
      empresa:["",Validators.required],
      intercompany:["",Validators.required],
      porcentaje:["",Validators.required]
    });

    this.myformM= this.m.group({
      empresam:["",Validators.required],
      intercompanym:["",Validators.required],
      porcentajem:["",Validators.required]
    });

    this.defaultColDef = {
      flex: 1,
      minWidth: 100,
    };
    this.rowSelection = 'single';
    }
 
  ngOnInit() {
          debugger
        this.procesosServ.getEmp()
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
          this.id=this.obj.emP_CODIGO;

           this.desc=this.obj.emP_DESCRIPCION;
          this.myformM.value.empresam =this.obj.emP_DESCRIPCION
          this.myformM.value.intercompanym =this.obj.emP_INTERCOMPANY
          this.myformM.value.porcentajem =this.obj.emP_PORCENTAJE

      }
    
  }


  showModel(){
     debugger
     this.success =false;       
     this.myformA.reset()
     this.title ='Agregar'
     this.showModal =true;
     this.showMsjemp= true; 
  }
  
  enviar(){
    debugger
    var  data ={  
      "emP_CODIGO": 47,
      "emP_DESCRIPCION": this.myformA.value.empresa,
      "emP_INTERCOMPANY":  this.myformA.value.intercompany,
      "emP_PORCENTAJE":  this.myformA.value.porcentaje,
       "seC_CODIGO":1
       }
    console.log(data)

    this.procesosServ.postEmp(data).subscribe((res) => {
       if (res == res){
          this.procesosServ.getEmp()
         .subscribe(res => {
          this.rowData=res;       
          this.success =true;       
          setTimeout(()=>{ 
          this.showModal= false; 
          }, 2000);
         
         
         }, err => {
           console.log(err);
         
         });
       }
     
    })
  }
  

  showModele(){
    debugger
    if(this.obj == undefined){ 
      
      this.title ='Atencion';
      this.showModeleliminar  = true; 
      this.showMsjemp= true;
      this.showMsjemp1=false;
      this.showconf=false;
      this.msjelim = "Debe seleccionar una Empresa"
    }else{
      if(this.id ==""){
        this.title ='Atencion';
        this.showModeleliminar  = true; 
        this.showMsjemp= true;
        this.showMsjmod=false;
        this.showconf=false;
        this.msjelim = "Debe seleccionar una Empresa"
    
      }else{
      this.showModeleliminar  = true;
      this.title ="Eliminar";
      this.showMsj  = true;
      this.showconf = true;
      this.showMsjemp=false;
      this.showMsjemp1=true;
      this.msjelim1 = "¿Desea eliminar la Empresa ";
      }
    }
  }

  enviaelim(id){
    this.procesosServ.deleteEmp(id).subscribe((id) => {
     
      if (id == id){
        debugger
         this.procesosServ.getEmp()
         
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
    // console.log(this.id) 
  }

  showModelm(){
    this.successm =false;     
    console.log(this.obj)
    if(this.obj == undefined){ 
      
      this.title ='Atencion';
      this.showModelmodificar  = true; 
      this.showMsjemp= true;
      this.showMsjmod=false;
      this.showconfr=false;
      this.msjelim = "Debe seleccionar una Empresa"
    }else{
      debugger
       setTimeout(()=>{    
        this.empresam =this.obj.emP_DESCRIPCION
        this.intercompanym=this.obj.emP_INTERCOMPANY
        this.porcentajem=this.obj.emP_PORCENTAJE
        }, 100);
       
      this.title ="Modificar";
      this.showModelmodificar=true;
      this.showMsjmod = true;
      this.showMsjemp = false;
      this.showconfr=true;
      }
    
 }
  enviamod(){
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

    this.procesosServ.putEmp(data).subscribe((res) => {
       if (res == res){
          this.procesosServ.getEmp()
         .subscribe(res => {
          this.rowData=res
          debugger
           this.successm =true;       
           setTimeout(()=>{ 
            this.empresam="";
            this.intercompanym="";
            this.porcentajem="";
            this.obj = undefined
            this.myformM.reset()
             this.showModelmodificar= false; 
           }, 1500);
      
         }, err => {
           console.log(err);
         
         });
       }
     
    })
  }

}
