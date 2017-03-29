import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Details } from '../details/details';
import {HttpProvider} from '../../providers/http-provider';


@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html',
  providers:[HttpProvider]
})
export class Page1 {
  items: any;


  constructor(public navCtrl: NavController, private httpProvider :HttpProvider){

    this.getdata();
  }

  getdata(){

  this.httpProvider.getJsonData().subscribe(
    result => {
      this.items=result;
      console.log("Success : "+this.items);
    },
    err =>{
      console.error("Error : "+err);
    } ,
    () => {
      console.log('getData completed');
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
