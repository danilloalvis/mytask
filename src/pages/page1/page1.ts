import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Details } from '../details/details';


@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {


  items: Array<{
    title: string,
    descricao: string,
    inicio: string,
    fim: string,
    imagem: string
  }>;

  constructor(public navCtrl: NavController) {


    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Aniversario ' + i,
        descricao: 'Legal',
        inicio: '01/04/1994',
        fim: '01/04/2017',
        imagem: 'https://dw9to29mmj727.cloudfront.net/misc/newsletter-naruto3.png'
      });
    }
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(Details, {
      item: item
    });
  }
}
