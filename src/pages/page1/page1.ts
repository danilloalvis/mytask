import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Details } from '../details/details';
import { LoadingController } from 'ionic-angular';
import {HttpProvider} from '../../providers/http-provider';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html',
  providers:[HttpProvider]
})
export class Page1 {
  items: any;

  constructor(public navCtrl: NavController, private httpProvider :HttpProvider, private loadingController: LoadingController,private storage: Storage){
    this.getdata();

  }

  getdata(){
    let loader = this.loadingController.create({
      content: "Aguarde..."
    });
    loader.present();

    this.httpProvider.getJsonData().subscribe(
      result => {
          this.items = result;
          console.log("Success : "+ JSON.stringify(this.items));

          this.storage.ready().then(() => {
            this.storage.set('mytask', JSON.stringify(this.items));
          });
      },
      err =>{
        console.error("Error : "+err);
        this.storage.ready().then(() => {
        this.storage.get('mytask').then((val) => {
          console.log('Json', val);
          this.items = JSON.parse(val);
          })
        });
       loader.dismiss();
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
