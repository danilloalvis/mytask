import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {Camera} from 'ionic-native';

@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html'
})
export class Page2 {
  public base64Image: string;

  constructor(public navCtrl: NavController) {

  }

  takePicture(){
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });
  }

  openGallery (): void {
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
