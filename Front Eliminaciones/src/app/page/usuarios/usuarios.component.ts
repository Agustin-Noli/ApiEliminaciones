import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { HttpClient } from '@angular/common/http';
import { ProcesosService } from 'src/app/servicios/procesos.service'
import { IUsuarios  } from 'src/app/Model/Usuarios';
import { Time } from '@angular/common';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  providers: [DatePipe]
})
export class UsuariosComponent implements OnInit {
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
  myDate = new Date();
  data;
  fecha;obj;
  legajo ;user;perfil;  msjelim;  msjelim1;  title;
  userm;perfilm;

  prueba=[];

  @ViewChild('agGrid') agGrid: AgGridAngular;

  
  columnDefs = [

       {headerName: 'Legajo', field: 'usU_LEGAJO', sortable: true, filter: true, resizable: true,suppressMovable:true},
       {headerName: 'Usuario', field: 'usU_NOMBRE', sortable: true, filter: true, resizable: true,suppressMovable:true },
       {headerName: 'Perfil', field: 'usU_PERFIL', sortable: true, resizable: true,suppressMovable:true},
       {headerName: 'Fecha Alta', field: 'usU_FECALTA', sortable: true,hide:true},
       {headerName: 'Codigo', field: 'seC_CODIGO', sortable: true,hide:true}

  ];
 
  public rowData=[];


  // private http: HttpClient,
  myformA:FormGroup
  myformM:FormGroup
  constructor(private procesosServ:ProcesosService,private a:FormBuilder,private m:FormBuilder) {

    this.myformA = this.a.group({
      legajo:["",Validators.required],
      user:["",Validators.required],
      perfil:["",Validators.required]
    });

    this.myformM = this.m.group({
      userm:["",Validators.required],
      perfilm:["",Validators.required]
    });


    this.defaultColDef = {
      flex: 1,
      minWidth: 100,
    };
    this.rowSelection = 'single';
     // this.rowData= this.procesosServ.pruebausers();

    }
  ngOnInit() {
    debugger
   this.procesosServ.getUsers()
 .subscribe((data) => {
  if(data.length == 0){
    // alert('no hay data para  mostar');
   console.log(this.rowData);
  }else{
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
      this.obj =selectedNodes[0].data 
    
      this.myformM.value.userm =this.obj.usU_NOMBRE
      this.myformM.value.perfilm =this.obj.usU_PERFIL


debugger

    }

  }


  showModel(){
    this.myformA.reset();
    this.success =false;       
    this.title ='Agregar'
    this.showModal =true;
    this.showMsjemp= true;
}

  
  showModele(){
    debugger 
    if(this.obj == undefined){
      debugger
        this.title ='Atencion';
        this.showModeleliminar  = true; 
        this.showMsjemp= true;
        this.showMsjemp1=false;
        this.showconf = false;
        this.msjelim = "Debe seleccionar un usuario";
       
    }else {
    if(this.legajo ==""){
      this.title ='Atencion';
      this.showModeleliminar  = true; 
      this.showMsjemp= true;
      this.showMsjemp1=false;
      this.showconf = false;
      this.msjelim = "Debe seleccionar un usuario";
  
    }else{  
      this.title ="Eliminar";
      this.showModeleliminar  = true;
      this.showMsj  = true;
      this.showconf = true;
      this.showMsjemp=false;
      this.showMsjemp1=true;
      this.msjelim1 = "¿Desea eliminar el usuario "
     }
    }
  }

  enviaelim(id){
      debugger
     this.procesosServ.deleteUsers(id).subscribe((id) => {
     
        if (id == id){
          debugger
           this.procesosServ.getUsers()
           
          .subscribe(res => {
           this.rowData=res
            
            this.legajo=""
            this.user=""
            this.perfil=""
            this.fecha=""
          }, err => {
            console.log(err);
          
          });
        }
      
     })
    }
  enviar(){
    debugger

             var  data = {  
              "usU_LEGAJO": this.myformA.value.legajo,
              "usU_NOMBRE": this.myformA.value.user,
              "usU_PERFIL": this.myformA.value.perfil,
              "usU_FECALTA": this.myDate,
              "seC_CODIGO": 1
          
        }

    this.procesosServ.postUsuers(data).subscribe((res) => {
       if (res == res){
          this.procesosServ.getUsers()
         .subscribe(res => {
          this.rowData=res
          debugger

          this.success =true;       
          setTimeout(()=>{ 
         //    this.myformA.reset()
            this.showModal= false; 
          }, 2000);
         }, err => {
           console.log(err);
         
         });
       }
     
    })
  }

  
  enviamod(){
    console.log(this.myformM.value)
    debugger
    let  user =((this.myformM.value.userm == null || this.myformM.value.userm == "") ? this.obj.usU_NOMBRE :this.myformM.value.userm );
    let perfl =((this.myformM.value.perfilm  ==  null || this.myformM.value.perfilm == "") ?  this.obj.usU_PERFIL :this.myformM.value.perfilm );


      var  data ={  
      "usU_LEGAJO":  this.obj.usU_LEGAJO,
      "usU_NOMBRE":   user,
      "usU_PERFIL":   perfl,
      "usU_FECALTA": this.obj.usU_FECALTA,
       "seC_CODIGO":1
       }
       debugger
    this.procesosServ.putUsers(data).subscribe((id) => {
       if (id == id){
          this.procesosServ.getUsers()
         .subscribe(res => {
          this.rowData=res
          debugger

           this.success=true
           setTimeout(()=>{ 
            this.userm="";
            this.perfilm="";
             this.obj = undefined
             this.myformM.reset()
             this.showModelmodificar= false; 
           }, 1500);




debugger

         }, err => {
           console.log(err);
         
         });
       }
     
    })
   }

  showModelm(){
    debugger
    this.success=false
  if(this.obj == undefined){
    this.title ='Atencion';
    this.showModelmodificar  = true; 
    this.showMsjemp= true;
    this.showMsjmod=false;
    this.showconf=false;
    this.msjelim = "Debe seleccionar un usuario"
   } 
  else{
    if(this.legajo ==""){
      this.title ='Atencion';
      this.showModelmodificar  = true; 
      this.showMsjemp= true;
      this.showMsjmod=false;
      this.showconf=false;
      this.msjelim = "Debe seleccionar un usuario"
  
    }else{
      setTimeout(()=>{    
        this.userm =this.obj.usU_NOMBRE
        this.perfilm=this.obj.usU_PERFIL
        }, 100);
debugger
      this.title ="Modificar";
      this.showModelmodificar=true;
      this.showMsjmod = true;
      this.showMsjemp = false;
      this.showconf=true;
        }
    }
  }

}
