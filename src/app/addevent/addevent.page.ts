import { Component, NgZone, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { Router } from '@angular/router';

declare var google: any;

@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.page.html',
  styleUrls: ['./addevent.page.scss'],
})
export class AddeventPage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  selectedRadio:string='public';
  inputFocused:boolean=false;
  acceptTerms:boolean=false;
  currentUser:any;
  eventJson:any={event_name:'',date:'',time:'',latitude:'',longitude:'',location:'',category_id:'',description:'', share_with:'public'};
  get_event_categories:any=[];
  get_locations:any=[];
  get_professions:any=[];
  map: any;
  GoogleAutocomplete = new (google.maps.places as any).AutocompleteService();
  autocomplete = { input: '' };
  autocompleteItems: any = [];
  geocoder:any;
  markers:any=[];
  selectedImage:any={name:'', data:''};
  event_images:any=[];
  disabled:boolean=false;

  constructor(private modalCtrl: ModalController, private apiService: ApiService, private commonService: CommonService, private geolocation: Geolocation,
     private zone: NgZone, private actionSheetController: ActionSheetController,private camera: Camera, private router: Router) { 
    this.geocoder = new (google.maps.Geocoder as any);
    this.markers = [];
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    let currentUser:any;
    currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(currentUser);
    console.log(this.currentUser);
    this.load_event_category();
    this.get_location();
  }

  get_location() {
    this.apiService.get_location()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.get_locations = response.data;
    },
    respError => {
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  load_event_category() {
    this.apiService.load_event_category()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.get_event_categories = response.data;
    },
    respError => {
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  updateGeoLocationSearchResults() {
    if (this.eventJson.location === '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions(
      { input: this.eventJson.location },
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
        this.eventJson.latitude = position.lat;
        this.eventJson.longitude = position.lng;
        let marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: this.map,
        });
        this.markers.push(marker);
        console.log(results[0].geometry);
        console.log(results[0]);
        // let actualName = results[0].address_components.find((component:any) => component.types.includes('point_of_interest')).long_name;
        // console.log(actualName);
        this.eventJson.location = results[0].formatted_address;
        console.log(this.eventJson.location);
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
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is a base64 encoded string
      //this.blogJson.blog_img = 'data:image/jpeg;base64,' + imageData; // Set base64 image
      var d = new Date(),
      n = d.getTime(),
      fileName = n + ".jpg";
      this.selectedImage = { name: fileName, data: `data:image/jpeg;base64,${imageData}`};
      this.event_images.push(this.selectedImage);
      //alert(JSON.stringify(this.album_images));
    }, (err) => {
      console.log('Error obtaining picture', err);
    });
  }

  async add_event() {
    if (this.eventJson.event_name == '') {
      this.commonService.showToastMessage('Please enter event name.', 'error-toast', 'top', 2000);
      return;
    }
    if (this.eventJson.category_id == '') {
      this.commonService.showToastMessage('Please select category.', 'error-toast', 'top', 2000);
      return;
    }
    if (this.eventJson.date == '') {
      this.commonService.showToastMessage('Please select date.', 'error-toast', 'top', 2000);
      return;
    }
    if (this.eventJson.time == '') {
      this.commonService.showToastMessage('Please select time.', 'error-toast', 'top', 2000);
      return;
    }
    if (this.eventJson.location == '') {
      this.commonService.showToastMessage('Please enter location.', 'error-toast', 'top', 2000);
      return;
    }
    if (this.eventJson.description == '') {
      this.commonService.showToastMessage('Please enter descriptiopn.', 'error-toast', 'top', 2000);
      return;
    }
    console.log(this.eventJson);
    if (this.event_images.length== 0) {
      this.commonService.showToastMessage('Please upload at least one product image.', 'error-toast', 'top', 2000);
      return;
    }
    if (this.eventJson.share_with == '') {
      this.commonService.showToastMessage('Please select share with.', 'error-toast', 'top', 2000);
      return;
    }
    this.disabled = true;
    let formData = new FormData();
    for(let i=0;i<this.event_images.length;i++){
      let response = await fetch(this.event_images[i].data);
      let blob = await response.blob();
      if(this.event_images[i].name==''){
        formData.append('event_image[]','');
      }
      else{
        formData.append('event_image[]' , blob, this.event_images[i].name); 
      }
    }
    formData.append("event_name",this.eventJson.event_name),
    formData.append("category_id",this.eventJson.category_id),
    formData.append("description",this.eventJson.description),
    formData.append("date",this.eventJson.date),
    formData.append("time",this.eventJson.time),
    formData.append("location",this.eventJson.location),
    formData.append("latitude",this.eventJson.latitude),
    formData.append("longitude",this.eventJson.longitude),
    formData.append("share_with",this.eventJson.share_with),
    formData.append("user_id",this.currentUser.user_id),
    console.log(this.eventJson);
    this.apiService.add_event_list(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
        console.log(response);
        this.disabled = false;
        this.commonService.showToastMessage(response.message, 'success-toast','', 2000);
        this.dismiss();
        this.router.navigate(['/event-category']);
      },
      respError => {
        this.disabled = false;
        this.commonService.showToastMessage(respError, 'error-toast','', 2000);
      })
  }

  onRadioSelect(value: string) {
    this.eventJson.share_with = value;
    console.log(this.eventJson.share_with);
  }

  dismiss() {
    // this.router.navigate(['/all-event-list']);
    this.modalCtrl.dismiss();
  }

}
