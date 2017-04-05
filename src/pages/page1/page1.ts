import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Details } from '../details/details';
import { LoadingController } from 'ionic-angular';
import {HttpProvider} from '../../providers/http-provider';


@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html',
  providers:[HttpProvider]
})
export class Page1 {
  items: any;


  constructor(public navCtrl: NavController, private httpProvider :HttpProvider, private loadingController: LoadingController){
    this.getdata();
  }

  getdata(){
    let loader = this.loadingController.create({
        content: "Aguarde"
      });
  loader.present();

  this.httpProvider.getJsonData().subscribe(
    result => {
      this.items = result;
      console.log("Success : "+this.items);

    },
    err =>{
      console.error("Error : "+err);

    } ,
    () => {
      console.log('getData completed');
        loader.dismiss()
    }
  );

}


  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(Details, {
      item: item
    });
  }
}
