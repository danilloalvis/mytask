import { Component } from '@angular/core';
import moment from 'moment';
import { NavController, NavParams } from 'ionic-angular';
//import { EmailComposer } from '@ionic-native/email-composer';


@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class Details {
  task: any;
  //emailComposer: EmailComposer;


  constructor(public navCtrl: NavController, public navParams: NavParams ) {
    console.log("Navegação de Paginas Fim : "+ this.getDateNow());
    this.task = navParams.get('item');

  }

  geturl(){
    return "https://arvantech.com/torquato_api/images/"+this.task.img;
  }

   getDateNow(){
  return moment().format('DD-MM-YYYY HH:mm:ss SSS');
  }

  sendMail(){
/*
    this.emailComposer.isAvailable().then((available: boolean) =>{
   if(available) {
       let email = {
       subject: 'Cordova Icons',
       body: this.task.json(),
       isHtml: false
     };

     // Send a text message using default options
     this.emailComposer.open(email);
     }
  });

*/
  }


}
