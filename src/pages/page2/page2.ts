  import { Component } from '@angular/core';
  import {Http}  from '@angular/http';
  import { NavController, LoadingController, Platform } from 'ionic-angular';
  import {Camera, DatePicker} from 'ionic-native';
    import moment from 'moment';
  declare var window: any;


  @Component({
    selector: 'page-page2',
    templateUrl: 'page2.html'
  })
  export class Page2 {
    public base64Image: string;
    public datainicio: string;
    public datafim: string;
    public inicio: string;
    public fim: string;

    constructor(public navCtrl: NavController, private http:Http, private loadingController: LoadingController, private platform: Platform){

    }

    showToast(message) {
      this.platform.ready().then(() => {
        window.plugins.toast.show(message, "short", "center");
      });
    }

    onSubmit(formData) {
      if(formData.valid) {

        let loader = this.loadingController.create({
          content: "Aguarde..."
        });
        loader.present();

        var link = 'https://arvantech.com/torquato_api/api.php';

        let body = new FormData();
        body.append('title', formData.value.title);
        body.append('description', formData.value.descrition);
        body.append('start_date', this.inicio);
        body.append('end_date', this.fim);
        body.append('image_url', this.mySplit(this.base64Image,1));
        
        console.log("Enviar Tarefa Inicio Inicio : "+ this.getDateNow());
        this.http.post(link, body)
        .subscribe(data => {
          console.log("Enviar Tarefa Inicio Fim : "+ this.getDateNow());
          console.log("Sucesso "+data);
          loader.dismiss()
          this.showToast("Tarefa salva com sucesso!");
        }, error => {
           console.log("Enviar Tarefa Inicio Fim : "+ this.getDateNow());
          console.log("Erro "+error);
          loader.dismiss()
            this.showToast("Falha ao tentar salvar a terefa");
        });
      }
    }

  mySplit (string, nb) {
      var array  = string.split(',');
      return array[nb];
  }

  toDataUrl(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var reader = new FileReader();
      reader.onloadend = function() {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }

  dateFim(): void {
    DatePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: DatePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(
      date =>{  this.datafim = date.toLocaleDateString("pt-BR")
      this.fim = date.toLocaleDateString("pt-BR")
    },
    err =>{ console.log('Error occurred while getting date: ', err)}
  );
  }

  dateInicio(): void {
    DatePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: DatePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(
      date =>{  this.datainicio = date.toLocaleDateString("pt-BR");
      this.inicio = date.toLocaleDateString("pt-BR");
    },
    err =>{ console.log('Error occurred while getting date: ', err)}
  );
  }

  takePicture(){
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      quality: 100,
      encodingType: Camera.EncodingType.JPEG,
      correctOrientation: true
    }).then((imageData) =>{ 
       console.log("Converter para Base64 Inicio : "+ this.getDateNow());
      this.base64Image = "data:image/jpeg;base64," + imageData;
       console.log("Converter para Base64 Fim : "+ this.getDateNow());
    
  }, (err) => {
      console.log(err);
    });
  }

  openGallery(): void {
    let cameraOptions = {
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: Camera.DestinationType.DATA_URL,
      quality: 100,
      encodingType: Camera.EncodingType.JPEG,
      correctOrientation: true
    }

    Camera.getPicture(cameraOptions)
    .then((imageData) =>{ 
       console.log("Converter para Base64 Inicio : "+ this.getDateNow());
      this.base64Image = "data:image/jpeg;base64," + imageData;
       console.log("Converter para Base64 Fim : "+ this.getDateNow());
    },
    err => console.log(err));
  }

   getDateNow(){
  return moment().format('DD-MM-YYYY HH:mm:ss SSS');
  }

  }
