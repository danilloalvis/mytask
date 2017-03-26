import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';


@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class Details {
  task: any;
  emailComposer: EmailComposer;


  constructor(public navCtrl: NavController, public navParams: NavParams ) {
    // If we navigated to this page, we will have an item available as a nav param
    this.task = navParams.get('item');

  }

  sendMail(){

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


  }


}
