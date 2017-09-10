import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import moment from 'moment';

/*
  Generated class for the HttpProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class HttpProvider {

  constructor(public http: Http) {
    console.log('Hello HttpProvider Provider');
  }

  getJsonData(){
     console.log("Conectar  Inicio : "+ this.getDateNow());
     var resp = this.http.get('https://arvantech.com/torquato_api/api.php');
     console.log("Conectar  Fim : "+ this.getDateNow());

     console.log("Json to object  Inicio : "+ this.getDateNow());
     var json =  resp.map(res => res.json()); 
     console.log("Json to object  Fim : "+ this.getDateNow());
    
     return json;
 }

  getDateNow(){
  return moment().format('DD-MM-YYYY HH:mm:ss SSS');
  }

}
