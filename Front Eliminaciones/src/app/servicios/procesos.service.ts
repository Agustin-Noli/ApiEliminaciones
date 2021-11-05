import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { IUsuarios  } from 'src/app/Model/Usuarios';
import { Observable } from 'rxjs';
import { IGrupos  } from 'src/app/Model/Grupos';
import { IProceso } from 'src/app/Model/Proceso';
import { IEmpresas } from 'src/app/Model/Empresas';
import { IMoneda } from 'src/app/Model/Moneda';
import { IRubros } from 'src/app/Model/Rubros';
import { ImpPlanillas } from 'src/app/Model/ImpPlanillas';
import { IAjustes } from 'src/app/Model/Ajustes';

 const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class ProcesosService {
  //myurl ='http://Dco16liis51:9081';
myurl ='http://localhost:5000'
  // Api cris https://localhost:44368/Eliminaciones/ImportPlanillas 
  // Servidor desarrollo \\Dco16liis51:9081\
  constructor(private http: HttpClient) { }
id:any;
myFecha:string;
secCod=1;

//Metodos para Ajustes
postAju(data){
  debugger
  return this.http.post<IAjustes>(this.myurl + '/Eliminaciones/Ajustes',data,httpOptions);
}

getAju(): Observable<IAjustes[]>{
debugger
 return this.http.get<IAjustes[]>(this.myurl +'/Eliminaciones/Ajustes/GetAjustesByPeriodo?Periodo='+this.myFecha+'&Sec_Codigo='+this.secCod);
}

deleteAju(obj){
debugger
  return this.http.delete<IAjustes>(this.myurl + '/Eliminaciones/Ajustes/'+obj,httpOptions);
}

putAju(obj){
  debugger
  return this.http.put<IAjustes>(this.myurl + '/Eliminaciones/Ajustes/',obj,httpOptions);
}




//Metodos para importacion de planillas
// getimpPlanillasAll(): Observable<ImpPlanillas[]>{
//   debugger
//    return this.http.get<ImpPlanillas[]>(this.myurl + '/Eliminaciones/ImportPlanillas'+this.secCod);
//   }

  getimpPlanillas(): Observable<ImpPlanillas[]>{
    debugger

     return this.http.get<ImpPlanillas[]>(this.myurl + '/Eliminaciones/ImportPlanillas/ByPeriodo?Periodo='+this.myFecha+'&Sec_Codigo='+this.secCod);
    }

//Metodos para Rubros
getRubros(): Observable<IRubros[]>{
  debugger
   return this.http.get<IRubros[]>(this.myurl + '/Eliminaciones/Rubros');
  }



//Metodos para Moneda
getMoneda(): Observable<IMoneda[]>{
  debugger
   return this.http.get<IMoneda[]>(this.myurl + '/Eliminaciones/Monedas');
  }

//Metodos para Borrar
getProceso(fecha){
  return[
    {
      "empCodigo": 1,
      "empDescripcion": "B.G.B.A.",
      "periodo": "082020",
      "rubCodigo": "0000111003",
      "rubDescripcion": "EFECTIVO EN CUST. ENTIDADES FINANCIERAS ",
      "empCodigoContraparte": 2,
      "empDescripcionContraparte": "Tarjeta Naranja S.A. (interco)",
      "ajuSaldo": 123.00,
      "ajuSaldoPromedio": 567.00
  },
    {
        "empCodigo": 1,
        "empDescripcion": "B.G.B.A.",
        "periodo": "082020",
        "rubCodigo": "0000111003",
        "rubDescripcion": "EFECTIVO EN CUST. ENTIDADES FINANCIERAS ",
        "empCodigoContraparte": 2,
        "empDescripcionContraparte": "Tarjeta Naranja S.A. (interco)",
        "ajuSaldo": 123.00,
        "ajuSaldoPromedio": 567.00
    },
    {
        "empCodigo": 3,
        "empDescripcion": "Tarjetas Cuyanas S.A.",
        "periodo": "082020",
        "rubCodigo": "0000111011",
        "rubDescripcion": "ORDENES DE PAGO A CARGO DEL B.C.R.A.    ",
        "empCodigoContraparte": 1,
        "empDescripcionContraparte": "B.G.B.A. (interco)",
        "ajuSaldo": 555.00,
        "ajuSaldoPromedio": 777.00
    },
    {
        "empCodigo": 4,
        "empDescripcion": "Tarjetas Regionales S.A.",
        "periodo": "072020",
        "rubCodigo": "0000111011",
        "rubDescripcion": "ORDENES DE PAGO A CARGO DEL B.C.R.A.    ",
        "empCodigoContraparte": 3,
        "empDescripcionContraparte": "Tarjetas Cuyanas S.A. (interco)",
        "ajuSaldo": 888.00,
        "ajuSaldoPromedio": 1990.00
    }
]


}
grupos(){
  return ["Todos","filiales del exterior","subsidiarias del exterior","empresas vinculadas" ] 
}
empresas(){
    
    return ["Galicia Seguros","Banco Galicia","Banco Interco","Banco Provincia" ]
      
}
getAll(){
  return[
    {
      "empperiodo": "202008",
      "empemprsa": "B.G.B.A.",
      "empcontraparte": "B.G.B.A. interco",
      "emprubro": "0000111003",
      "empsaldo":"15000",
      "empsaldopromedio": "14000",
      "empeliminacion": 500,
      "empmoneda": "Pesos"
      
    },
    {
      "empperiodo": "202008",
      "empemprsa": "B.G.B.A.",
      "empcontraparte": "B.G.B.A. interco",
      "emprubro": "0000111003",
      "empsaldo":"15000",
      "empsaldopromedio": "14000",
      "empeliminacion": "-500",
      "empmoneda": "Pesos"
    },
    {
      "empperiodo": "202008",
      "empemprsa": "B.G.B.A.",
      "empcontraparte": "B.G.B.A. interco",
      "emprubro": "0000111003",
      "empsaldo":"15000",
      "empsaldopromedio": "14000",
      "empeliminacion": "-500",
      "empmoneda": "Pesos"
    },
    {
      "empperiodo": "asdasd",
      "empemprsa": "asdasd.",
      "empcontraparte": "agustin",
      "emprubro": "12",
      "empsaldo":"12",
      "empsaldopromedio": "12",
      "empeliminacion": "-12",
      "empmoneda": "Pesos"
    }
]


}
  
//Metodos para Empresas

postEmp(data){
  debugger

  return this.http.post<IEmpresas>(this.myurl + '/api/Empresas',data,httpOptions);
}

getEmp(): Observable<IEmpresas[]>{
debugger
 return this.http.get<IEmpresas[]>(this.myurl + '/api/Empresas');
}

getEmpbyperiodo(): Observable<IEmpresas[]>{
  debugger
   return this.http.get<IEmpresas[]>(this.myurl + 'Eliminaciones/Empresas/GetEmpresasByPeriodo?Periodo='+this.myFecha+'&Sec_Codigo='+this.secCod);
  }

deleteEmp(id: string){
debugger
  return this.http.delete<IEmpresas>(this.myurl + '/Eliminaciones/Empresas/'+id,httpOptions);
}

putEmp(obj){
  debugger
  return this.http.put<IEmpresas>(this.myurl + '/Eliminaciones/Empresas/'+obj.emP_CODIGO ,obj,httpOptions);
}




//Metodos para Procesos


// getPeriodo1(): Observable<IProceso[]>{

//   return this.http.get<IProceso[]>(this.myurl + '/api/proceso');
//  }

 getPeriodo(){
   
  return this.http.get<IProceso[]>(this.myurl + '/Eliminaciones/DatosPlanillas/GetDatosPlanillaByPeriodo?Periodo='+this.myFecha+'&Sec_Codigo='+this.secCod,httpOptions);
 }



// Metodos de Usuarios
postUsuers(data){
  debugger

  return this.http.post<IUsuarios>(this.myurl + '/Eliminaciones/Usuarios',data,httpOptions);
}

getUsers(): Observable<IUsuarios[]>{

 return this.http.get<IUsuarios[]>(this.myurl + '/Eliminaciones/Usuarios/'+this.secCod);
}

deleteUsers(legajo: string){
debugger
  return this.http.delete<IUsuarios>(this.myurl + '/Eliminaciones/Usuarios?Usu_Legajo='+legajo+'&Sec_Codigo='+this.secCod,httpOptions);
}

putUsers(obj){
  debugger
  return this.http.put<IUsuarios>(this.myurl + '/Eliminaciones/Usuarios/'+obj.usU_LEGAJO ,obj,httpOptions);
}


// Metodos de Grupo
getGrupo(): Observable<IGrupos[]>{
debugger
  return this.http.get<IGrupos[]>(this.myurl + '/Eliminaciones/Grupos/'+this.secCod);

}
postGrupo(data){
  debugger
  return this.http.post<IGrupos>(this.myurl + '/Eliminaciones/Grupos',data,httpOptions);
}

deleteGrupo(id: string){
  return this.http.delete<IGrupos>(this.myurl + '/Eliminaciones/Grupos?Grupo_Id='+id+'&Sec_Codigo='+this.secCod,httpOptions);
}

putGrupo(obj){
  debugger
  return this.http.put<IGrupos>(this.myurl + '/Eliminaciones/Grupos/'+obj.grupO_ID ,obj,httpOptions);
}







}