import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { ActionSheetController, IonPopover, ToastController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  @ViewChild('professionPopover') professionPopover!: IonPopover;

  user:any={name:'',city:'', location:'',mobile_no:'',email_id:'',profession:'',specialization:''};
  get_cities:any = [];
  get_locations:any = [];
  get_professions:any = [];
  get_specializations:any = [];
  get_interests:any = [];
  inputFocused: boolean = false;
  selectedImage:any={name:'', data:''};

  selectedProfessionName = '';
  searchTerm = '';
  filteredProfessions :any[] = [];
  isPopoverOpen = false;
  mobile_no:string='';
  referral_code:string='';
  handshake_data:any;

  constructor(private toastController: ToastController, private router:Router, private apiService: ApiService, private commonService: CommonService,
    private actionSheetController: ActionSheetController,private camera: Camera, private activatedRoute: ActivatedRoute) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.mobile_no = params['mobile_no'];
      this.referral_code = params['referral_code'];
      // console.log(this.user_details);
    });
    this.get_handshake();
    this.get_city();
    // this.get_location();
    this.get_profession();
    this.get_specialization();
    this.get_interest();
  }

  // onInputFocus() {
  //   this.inputFocused = true;
  // }

  // onInputBlur() {
  //   // Only remove focus if the input is empty
  //   if (!this.user.name) {
  //     this.inputFocused = false;
  //   }
  // }

  openPopover(event: Event) {
    this.isPopoverOpen = true;
  }

  get_handshake() {
    this.commonService.presentLoading();
    this.apiService.get_handshake(this.mobile_no,'', 'register', this.referral_code)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.handshake_data = response[0];
      this.user.name=this.handshake_data.FULL_NAME;
      this.user.city=this.handshake_data.CITY_id;
      this.load_location();
      // this.user.location=this.handshake_data.LOCATION_id;
      this.user.mobile_no=this.handshake_data.MOBILE_NO;
      this.user.email_id = this.handshake_data.EMAIL_ID;
      this.commonService.dismissLoading();
    },
    respError => {
      this.commonService.dismissLoading();
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  get_city() {
    this.apiService.get_city()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.get_cities = response.data;
      // this.get_cities.unshift({id:'',NAME:'Select City'});
    },
    respError => {
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }
  load_location() {
    this.apiService.load_location(this.user.city)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.get_locations = response.data;
      if(this.handshake_data.LOCATION_id){
        let index= this.commonService.findItem(this.get_locations,'id',this.handshake_data.LOCATION_id);
        if(index!=-1){
          this.user.location=this.get_locations[index].id;
        }
      }
      // this.get_locations.unshift({id:'',NAME:'Select Location'});
    },
    respError => {
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }
  get_profession() {
    this.apiService.get_profession()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.get_professions = response.data;
      this.filteredProfessions = [...this.get_professions];
      // this.get_professions.unshift({id:'',NAME:'Select Profession'});
    },
    respError => {
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  filterProfessions() {
    this.filteredProfessions = this.get_professions.filter((item:any) =>
      item.NAME.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  selectProfession(item: any) {
    this.user.profession = item.id;
    this.selectedProfessionName = item.NAME;
    this.isPopoverOpen = false;
  }
  get_specialization() {
    this.apiService.get_specialization()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.get_specializations = response.data;
      // this.get_specializations.unshift({id:'',NAME:'Select Specialization'});
    },
    respError => {
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }
  get_interest() {
    this.apiService.get_interest()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.get_interests = response.data;
      // this.get_interests.unshift({id:'',NAME:'Select Interest'});
    },
    respError => {
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
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
      // this.album_images.push(this.selectedImage1);
      //alert(JSON.stringify(this.album_images));
    }, (err) => {
      console.log('Error obtaining picture', err);
    });
  }

  async onRegister(){
    if(this.user.name == '') {
      this.commonService.showToastMessage('Please enter name.', 'error-toast', 'top', 2000);
      return;
    }
    if(this.user.city == '') {
      this.commonService.showToastMessage('Please enter city.', 'error-toast', 'top', 2000);
      return;
    }
    if(this.user.location == '') {
      this.commonService.showToastMessage('Please enter location.', 'error-toast', 'top', 2000);
      return;
    }
    if(this.user.mobile_no == '') {
      this.commonService.showToastMessage('Please enter mobile number.', 'error-toast', 'top', 2000);
      return;
    }
    let mpattern = /(^\d{10}$)/;
    if (!mpattern.test(this.user.mobile_no)) {
      this.commonService.showToastMessage('Please enter phone number in correct format.', 'error-toast', 'top', 2000);
      return;
    }
    if(this.user.email_id == '') {
      this.commonService.showToastMessage('Please enter email.', 'error-toast', 'top', 2000);
      return;
    }
    let epattern = /[A-Za-z0-9._%+-]{1,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})/;
    if (!epattern.test(this.user.email_id)) {
      this.commonService.showToastMessage('Please enter email in correct format.', 'error-toast', 'top', 2000);
      return;
    }
    if(this.user.profession == '') {
      this.commonService.showToastMessage('Please enter Profession.', 'error-toast', 'top', 2000);
      return;
    }
    if(this.user.specialization == '') {
      this.commonService.showToastMessage('Please enter specialization.', 'error-toast', 'top', 2000);
      return;
    }
    // if(this.user.interest == '') {
    //   this.commonService.showToastMessage('Please enter interest.', 'error-toast', 'top', 2000);
    //   return;
    // }
    // console.log(this.user.interest);
    let formData = new FormData();
    formData.append('name',this.user.name);
    formData.append('city',this.user.city);
    formData.append('location',this.user.location);
    formData.append('mobile_no',this.user.mobile_no);
    formData.append('email_id',this.user.email_id);
    formData.append('profession',this.user.profession);
    formData.append('specialization',this.user.specialization);
    // formData.append('interest',this.user.interest);
    let response = await fetch(this.selectedImage.data);
    let blob = await response.blob();
    if(this.selectedImage.name==''){
      formData.append('profile_img','');
    }
    else{
      formData.append('profile_img' , blob, this.selectedImage.name); 
    }
    formData.append('user_status','user');
    formData.append('apptype',this.apiService.apptype);
    this.apiService.add_user(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
        console.log(response);
        localStorage.setItem('currentUser',JSON.stringify(response.user_data));
        this.commonService.showToastMessage(response.message, 'success-toast','', 4000);
        this.router.navigate(['/dashboard']);
      },
      respError => {
        this.commonService.showToastMessage(respError, 'error-toast','', 4000);
      })
  }
  
  async presentToast(msg: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    await toast.present();
  }
}
