    import { Component } from '@angular/core';
    import { NavController } from 'ionic-angular';
    import { Details } from '../details/details';
    import { LoadingController } from 'ionic-angular';
    import {HttpProvider} from '../../providers/http-provider';
    import { Storage } from '@ionic/storage';
    import moment from 'moment';


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
              console.log("Armazenar Tarefas Inicio : "+ this.getDateNow());
              this.storage.ready().then(() => {
                

                console.log("Object to json  Inicio : "+ this.getDateNow());
                var save =   JSON.stringify(this.items);
                console.log("Object to json  Fim : "+ this.getDateNow());
                this.storage.set('mytask',save);
              });
              console.log("Armazenar Tarefas Fim : "+ this.getDateNow());
          },
          err =>{
            console.error("Error : "+err);
            
            console.log("Ler Tarefas Inicio : "+ this.getDateNow());
            this.storage.ready().then(() => {
            this.storage.get('mytask').then((val) => {
            console.log("Ler Tarefas Fim : "+ this.getDateNow());
            
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

    getDateNow(){
    return moment().format('DD-MM-YYYY HH:mm:ss SSS');
    }

      itemTapped(event, item) {
        console.log("Navegação de Paginas Inicio : "+ this.getDateNow());
        this.navCtrl.push(Details, {
          item: item
        });
      }
    }
