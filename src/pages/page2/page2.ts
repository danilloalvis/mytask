import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {Camera} from 'ionic-native';
import { DatePicker } from 'ionic-native';

@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html'
})
export class Page2 {
    public base64Image: string;
    public datainicio: string;
    public datafim: string;

  constructor(public navCtrl: NavController) {

  }

  takePicture(){
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL
    }).then((imageData) => {
        this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });
  }

  dateFim(): void {
    DatePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: DatePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(
      date =>{  this.datafim = date.toString()},
      err =>{ console.log('Error occurred while getting date: ', err)}
    );
  }

  dateInicio(): void {
    DatePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: DatePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(
      date =>{  this.datainicio = date.toString()},
      err =>{ console.log('Error occurred while getting date: ', err)}
    );
  }

  openGallery(): void {
    let cameraOptions = {
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: Camera.DestinationType.FILE_URI,
      quality: 100,
      encodingType: Camera.EncodingType.JPEG,
      correctOrientation: true
    }

    Camera.getPicture(cameraOptions)
      .then(file_uri => this.base64Image = file_uri,
      err => console.log(err));
  }

}
