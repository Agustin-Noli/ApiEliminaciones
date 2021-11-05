import { Pipe, PipeTransform } from '@angular/core';
import { ProcesosService } from '../servicios/procesos.service';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

   transform(value: any, ...args: any[]): unknown {

   // transform(value: any,arg: any): any {
   
      const resultProceso =[];
 
      for (const proceso of value ){
       // if (proceso.grupo1.toLowerCase().indexOf(arg.toLowerCase()) > -1 ){
        if (proceso.rubro.toLowerCase().indexOf(args) > -1 ){
          resultProceso.push(proceso);
          }
          debugger
        if (proceso.rubro.toLowerCase().indexOf(args[0][0]) > -1 ){
    
              if(args[0][0] == ""){
               resultProceso.push(proceso);
              }else if (args[0][1] == proceso.rubro){
                resultProceso.push(proceso);
              }


      
        
        }

      }
return resultProceso;

  }

}
