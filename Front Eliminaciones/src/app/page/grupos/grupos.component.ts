import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { HttpClient } from '@angular/common/http';
import { ProcesosService } from 'src/app/servicios/procesos.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.scss']
})
export class GruposComponent implements OnInit {
  
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
  id;grupo;descripcion;obj;

  msjelim;  msjelim1;  title;
 grupom;
 descripcionm;

  prueba=[];

  @ViewChild('agGrid') agGrid: AgGridAngular;

  
  columnDefs = [
      {headerName: 'Codigo', field: 'grupO_ID', sortable: true, filter: true,hide:true},
      {headerName: 'Grupo', field: 'grupO_NOMBRE', sortable: true, filter: true,resizable: true,suppressMovable:true },
      {headerName: 'Descripcion', field: 'grupO_DESCRIPCION', sortable: true,suppressMovable:true},
      {headerName: 'Codigo', field: 'seC_CODIGO', sortable: true,suppressMovable:true,hide:true}


  ];
 
  rowData: any;
  // private http: HttpClient,
  myformA:FormGroup
  myformM:FormGroup
  constructor(private procesosServ:ProcesosService,private a:FormBuilder,private m:FormBuilder) {
    this.myformA = this.a.group({
      grupo:["",Validators.required],
      descripcion:["",Validators.required]
    
    });

    this.myformM = this.m.group({
      grupom:["",Validators.required],
      descripcionm:["",Validators.required]
    
    });

    this.defaultColDef = {
      flex: 1,
      minWidth: 100,
    };
    this.rowSelection = 'single';
  
    }
 
  ngOnInit() {
  
      this.procesosServ.getGrupo()
    .subscribe((data) => {
     if(data.length == 0){
      //  alert('no hay data para  mostar');
      console.log(this.rowData);
     }else{
      console.log(this.rowData);
       this.rowData =data
          }
       } 
   );
  }
  onSelectionChanged(e){
    // debugger
   
    let selectedNodes = this.agGrid.api.getSelectedNodes();
    // const selectedData = selectedNodes.map( node => node.data );
    // const selectedDataStringPresentation = selectedData.map( node => node.make + ' ' + node.model).join(', ');

    this.obj = selectedNodes

   
    if(this.obj.length == 0)
    {
      this.obj = undefined;
    }else{
      debugger
      this.obj =selectedNodes[0].data 
      //  console.log(this.obj)
      this.id=this.obj.grupO_ID
      this.grupo=this.obj.grupO_NOMBRE
      this.descripcion=this.obj.grupO_DESCRIPCION    
    }

  }


  showModel(){
    this.success =false;       
     this.myformA.reset()
    this.title ='Agregar'
    this.showModal =true;
    this.showMsjemp= true; 
  }

  enviar(){
    debugger
               var  data = {  
              "grupO_ID": 3,
              "grupO_NOMBRE":this.myformA.value.grupo,
              "grupO_DESCRIPCION": this.myformA.value.descripcion,
              "seC_CODIGO": 1
               }
    this.procesosServ.postGrupo(data).subscribe((res) => {
       if (res == res){
          this.procesosServ.getGrupo()
         .subscribe(res => {
          this.rowData=res
          debugger
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
    if(this.obj == undefined){
      this.title ='Atencion';
        this.showModeleliminar  = true; 
        this.showMsjemp= true;
        this.showMsjemp1=false;
        this.showconf = false;
        this.msjelim = "Debe seleccionar un grupo";
       
    }else{
      if(this.id ==""){
        this.title ='Atencion';
        this.showModeleliminar  = true; 
        this.showMsjemp= true;
        this.showMsjemp1=false;
        this.showconf = false;
        this.msjelim = "Debe seleccionar un grupo";
    
      }else{  
      debugger
      this.showModeleliminar  = true;
      this.title ="Eliminar";
      this.showMsj  = true;
        this.showconf = true;
        this.showMsjemp=false;
        this.showMsjemp1=true;
        this.msjelim1 = "¿Desea eliminar el grupo "
            }
       }
  }

  enviaelim(id){
    debugger
   this.procesosServ.deleteGrupo(id).subscribe((id) => {
   
      if (id == id){
        debugger
         this.procesosServ.getGrupo()
         
        .subscribe(res => {
         this.rowData=res
          
          this.id=""
          this.grupo=""
          this.descripcion=""
        }, err => {
          console.log(err);
        
        });
      }
    
   })
  }


  showModelm(){
    this.successm=false
  if(this.obj == undefined){ 
      this.title ='Atencion';
      this.showModelmodificar  = true; 
      this.showMsjemp= true;
      this.showMsjmod=false;
      this.showconfr=false;
      this.msjelim = "Debe seleccionar un grupo"
  }else{
    if(this.id ==""){
      this.title ='Atencion';
      this.showModelmodificar  = true; 
      this.showMsjemp= true;
      this.showMsjmod=false;
      this.showconfr=false;
      this.msjelim = "Debe seleccionar un grupo"
  
    }else{   

      setTimeout(()=>{           
        this.grupom=this.obj.grupO_NOMBRE
        this.descripcionm=this.obj.grupO_DESCRIPCION
        }, 100);
      this.title ="Modificar";
      this.showModelmodificar=true;
      this.showMsjmod = true;
      this.showMsjemp = false;
      this.showconf=true;
    }
   }
  }

  enviamod(){
    console.log(this.myformM.value)

    let  grup =((this.myformM.value.grupom == null || this.myformM.value.grupom == "") ?  this.obj.grupO_NOMBRE: this.myformM.value.grupom );
    let  desc =((this.myformM.value.descripcionm == null || this.myformM.value.descripcionm == "") ? this.obj.grupO_DESCRIPCION :this.myformM.value.descripcionm );


      var  data ={  
      "grupO_ID": 3,
      "grupO_NOMBRE":  grup,
      "grupO_DESCRIPCION": desc,
      "seC_CODIGO": this.obj.seC_CODIGO
       }
       debugger
  
    this.procesosServ.putGrupo(data).subscribe((id) => {
       if (id == id){
          this.procesosServ.getGrupo()
         .subscribe(res => {
          this.rowData=res
          debugger

          this.successm=true
          setTimeout(()=>{ 
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




