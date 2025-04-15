import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';

declare var google: any;

@Component({
  selector: 'app-add-convenience',
  templateUrl: './add-convenience.page.html',
  styleUrls: ['./add-convenience.page.scss'],
})
export class AddConveniencePage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  currentUser:any;
  get_categories:any=[];
  convenienceJson:any={convenience_name:'',category_id:'',profession:'', mobile_no:'',location:'',latitude:'',longitude:''};
  selectedImage:any={name:'', data:''};
  convenience_images:any=[];
  location='';
  map: any;
  GoogleAutocomplete = new (google.maps.places as any).AutocompleteService();
  autocomplete = { input: '' };
  autocompleteItems: any = [];
  geocoder:any;
  markers:any=[];
  disabled=false;
  acceptTerms:boolean = false;

  constructor(private modalCtrl: ModalController,private apiService: ApiService,private commonService: CommonService, private geolocation: Geolocation, 
    private zone: NgZone, private actionSheetController: ActionSheetController,private camera: Camera, private router: Router) { 
    this._unsubscribeAll = new Subject();
    this.geocoder = new (google.maps.Geocoder as any);
    this.markers = [];
  }

  ngOnInit() {
    let currentUser:any;
    currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(currentUser);
    console.log(this.currentUser);
    this.load_convenience_category();
  }

  load_convenience_category() {
    this.apiService.load_convenience_category()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.get_categories = response.data;
    },
    respError => {
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  updateGeoLocationSearchResults() {
    if (this.convenienceJson.location === '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions(
      { input: this.convenienceJson.location },
      (predictions: any, status: any) => {
        this.autocompleteItems = [];
        this.zone.run(() => {
          if (predictions) {
            predictions.forEach((prediction:any) => {
              this.autocompleteItems.push(prediction);
            });
          }
        });
      }
    );
  }

  selectGeoLocationSearchResult(item:any) {
    // this.clearMarkers();
    this.autocompleteItems = [];
    // let geocoder = new (google.maps as any).Geocoder();
    this.geocoder.geocode({'placeId': item.place_id}, (results:any[], status:any) => {
      if(status === 'OK' && results[0]){
        let position = {
          lat: results[0]['geometry']['location'].lat(),
          lng: results[0]['geometry']['location'].lng()
        };
        // store the longitude and latitude of the map
        // localStorage.setItem('markerPosition', JSON.stringify(position));
        this.convenienceJson.latitude = position.lat;
        this.convenienceJson.longitude = position.lng;
        let marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: this.map,
        });
        this.markers.push(marker);
        console.log(results[0].geometry);
        console.log(results[0]);
        // let actualName = results[0].address_components.find((component:any) => component.types.includes('point_of_interest')).long_name;
        // console.log(actualName);
        this.convenienceJson.location = results[0].formatted_address;
        console.log(this.location);
        // this.map.setCenter(results[0].geometry.location);
      }
    })
    // console.log(this.business_Json);
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Image Source',
      buttons: [
        {
          text: 'Select photo from Gallery',
          icon: 'images',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Open Camera',
          icon: 'camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  takePicture(sourceType: PictureSourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true   // ✅ Add this line
    };

    this.camera.getPicture(options).then((imageData) => {
      var d = new Date(),
      n = d.getTime(),
      fileName = n + ".jpg";
      this.selectedImage = { name: fileName, data: `data:image/jpeg;base64,${imageData}`};
      this.convenience_images.push(this.selectedImage);
    }, (err) => {
      console.log('Error obtaining picture', err);
    });
  }

  async add_convenience() {
    if (this.convenienceJson.convenience_name == '') {
      this.commonService.showToastMessage('Please enter convenience name.', 'error-toast', 'top', 2000);
      return;
    }
    if (this.convenienceJson.category_id == '') {
      this.commonService.showToastMessage('Please select category.', 'error-toast', 'top', 2000);
      return;
    }
    if (this.convenienceJson.profession == '') {
      this.commonService.showToastMessage('Please enter profession.', 'error-toast', 'top', 2000);
      return;
    }
    if (this.convenienceJson.mobile_no == '') {
      this.commonService.showToastMessage('Please enter mobile number.', 'error-toast', 'top', 2000);
      return;
    }
    let mpattern = /(^\d{10}$)/;
    if (!mpattern.test(this.convenienceJson.mobile_no)) {
      this.commonService.showToastMessage('Please enter phone number in correct format.', 'error-toast', 'top', 2000);
      return;
    }
    if (this.convenienceJson.location == '') {
      this.commonService.showToastMessage('Please enter location.', 'error-toast', 'top', 2000);
      return;
    }
    // if (this.convenience_images.length== 0) {
    //   this.commonService.showToastMessage('Please upload at least one convenience image.', 'error-toast', 'top', 2000);
    //   return;
    // }
    this.disabled = true;
    let formData = new FormData();
    // for(let i=0;i<this.convenience_images.length;i++){
    //   let response = await fetch(this.convenience_images[i].data);
    //   let blob = await response.blob();
    //   if(this.convenience_images[i].name==''){
    //     formData.append('convenience_image[]','');
    //   }
    //   else{
    //     formData.append('convenience_image[]' , blob, this.convenience_images[i].name); 
    //   }
    // }
    formData.append("convenience_name",this.convenienceJson.convenience_name),
    formData.append("category_id",this.convenienceJson.category_id),
    formData.append("profession",this.convenienceJson.profession),
    formData.append("mobile_no",this.convenienceJson.mobile_no),
    formData.append("location",this.convenienceJson.location),
    formData.append("latitude",this.convenienceJson.latitude),
    formData.append("longitude",this.convenienceJson.longitude),
    formData.append("user_id",this.currentUser.user_id),
    formData.append("apptype",this.apiService.apptype),
    console.log(this.convenienceJson);
    this.apiService.add_convenience(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
        console.log(response);
        this.disabled = false;
        this.commonService.showToastMessage(response.message, 'success-toast','', 2000);
        this.dismiss();
        this.router.navigate(['/convenience-list']);
        this.inviteViaWhatsApp(response.status_msg);
      },
      respError => {
        this.disabled = false;
        console.log(respError)
        this.commonService.showToastMessage(respError, 'error-toast','', 2000);
      })
  }

  inviteViaWhatsApp(msg:string) {
    const message = encodeURIComponent(msg);
    // const link = encodeURIComponent("https://your-app-link.com");
    // const whatsappUrl = `https://wa.me/?text=${message} ${link}`;
    const whatsappUrl = `https://wa.me/?text=${message}`;
    
    // window.open(whatsappUrl, '_blank');
    window.open(whatsappUrl, '_system');
  }

  dismiss() {
    // this.router.navigate(['/all-event-list']);
    this.modalCtrl.dismiss();
  }

}
