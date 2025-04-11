import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { ActionSheetController, AlertController, ModalController, NavParams, Platform } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';
import { ConnectionsPage } from '../connections/connections.page';
import { EditProfilePage } from '../edit-profile/edit-profile.page';
import { MyActivityPage } from '../my-activity/my-activity.page';
import { SettingmodalPage } from '../settingmodal/settingmodal.page';
import { ViewImagePage } from '../view-image/view-image.page';
import { AapasmeinAccoladesPage } from '../aapasmein-accolades/aapasmein-accolades.page';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  @ViewChild('scrollableContainer', { static: false }) scrollableContainer!: ElementRef;

  private _unsubscribeAll: Subject<any>;

  // @Input() search_id!: string;

  search_id:string='';
  search_user_details:any;
  connection_details:any;
  connectionFlag:boolean = false;
  login_details:any;
  routeURL:string='';
  selectedImage:any={name:'', data:''};
  currentUser:any;
  user_details:any;
  addAdvantage:boolean = false;
  imageUrl = 'https://aapasmein.dvadminpanel.in/media/';
  imageURL = 'https://aapasmein.dvadminpanel.in';
  frameType: string = 'gold-frame';
  searchText:string='';
  advantage_status:boolean = false;
  sender_id:string='';
  mobile_no:string='';
  segment_type:string='';
  REQUEST_STATUS:string='';

  // scholarships = [
  //   { name: 'Scholarship 1', image: 'assets/accolades/badge.png' },
  //   { name: 'Scholarship 2', image: 'assets/accolades/shield.png' },
  //   { name: 'Scholarship 3', image: 'assets/accolades/trophy.png' },
  //   { name: 'Scholarship 4', image: 'assets/accolades/medal.png' }
  // ];

  scholarships = [
    { name: 'medal-outline', classname:'medal-color' },
    { name: 'trophy-outline', classname: 'trophy-color' },
    { name: 'ribbon-outline', classname: 'ribbon-color' },
    { name: 'shield-checkmark-outline', classname: 'shield-color' }
  ];

  constructor(private router: Router, private modalCtrl: ModalController, private activatedRoute: ActivatedRoute, private apiService: ApiService,
    private commonService: CommonService, private actionSheetController: ActionSheetController, private camera: Camera, private alertCtrl: AlertController,
    private platform:Platform, private callNumber: CallNumber) { 
    this._unsubscribeAll = new Subject();
  }

    scrollLeft() {
      this.scrollableContainer.nativeElement.scrollBy({ left: -200, behavior: 'smooth' });
    }

    scrollRight() {
      this.scrollableContainer.nativeElement.scrollBy({ left: 200, behavior: 'smooth' });
    }

  ngOnInit() {
    let currentUser:any;
    currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(currentUser);
    console.log(this.currentUser);
    this.activatedRoute.queryParams.subscribe(params => {
      this.search_id = params['search_id'];
      this.routeURL = params['routeURL'];
      this.searchText = params['searchText'];
      this.sender_id = params['sender_id'];
      this.mobile_no = params['mobile_no'];
      this.segment_type = params['segment_type'];
      this.REQUEST_STATUS = params['REQUEST_STATUS'];
      console.log(this.REQUEST_STATUS);
      console.log(this.routeURL);
      console.log(this.search_id);
      console.log('seneder_id',this.sender_id);
      // this.search_keyword_details();
      if(this.search_id!=undefined){
        this.search_keyword_details();
      }
      else{
        this.search_user_details={};
        this.get_user_details();
      }
    });
    // this.search_id = this.navParams.get('search_id');
  }

  doRefresh(event:any){
    setTimeout(() => {
      // Any calls to load data go here
      if(this.search_id!=undefined){
        this.search_keyword_details();
      }
      else{
        this.search_user_details={};
        this.get_user_details();
      }
      event.target.complete();
    }, 100);
  }

  // Update this variable based on user profile or other logic
  // updateFrameType(type: string) {
  //   this.frameType = type;
  // }

  get_login_id() {
    this.apiService.get_login_id()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
        console.log('Login Id',response);
        this.login_details = response;
        this.search_keyword_details();
      },
      respError => {
        this.commonService.showToastMessage(respError, 'error-toast','', 2000);
      })
  }

  get_user_details() {
    this.apiService.get_user(this.sender_id==undefined?this.currentUser.user_id:this.sender_id)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
        console.log('user details',response);
        this.user_details = response.user_data[0];
        if(response.advantage_status.length>0){
          this.advantage_status = response.advantage_status[0].ADDED;
          if(this.advantage_status==true){
            this.addAdvantage = true;
          }
        }
      },
      respError => {
        this.commonService.showToastMessage(respError, 'error-toast','', 2000);
      })
  }

  search_keyword_details() {
    let login_details:any={login_id:''};
    login_details.login_id = this.currentUser.user_id;
    this.apiService.search_keyword_details(this.search_id, login_details, this.mobile_no)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
        console.log('All Data',response);
        this.search_user_details = response.search_user_data;
        // this.search_user_details['image'] = 'avtar3.jpeg';
        this.connection_details = response.connection;
      },
      respError => {
        this.commonService.showToastMessage(respError, 'error-toast','', 2000);
      })
  }

  add_advantage() {
    let formData = new FormData();
    formData.append("user_id",this.currentUser.user_id)
    if(this.addAdvantage){
      formData.append("status",'removed')
    }
    else{
      formData.append("status",'added')
    }
    this.apiService.add_advantage(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
        console.log('user details',response);
        if(response.message=='Added To Advantage'){
          this.addAdvantage = true;
        }
        else{
          this.addAdvantage = false;
        }
        this.commonService.showToastMessage(response.message, 'info-toast','', 3000);
        // this.goToadvantageDetails();
      },
      respError => {
        this.addAdvantage = true;
        this.commonService.showToastMessage(respError, 'error-toast','', 2000);
      })
  }

  makeCall() {
    this.platform.ready().then(() => {
      this.callNumber.callNumber(this.search_user_details.MOBILE_NO, true)
        .then(res => console.log('Dialing succeeded!', res))
        .catch(err => console.log('Dialing failed', err));
    });
  }

  async openModal() {
    this.commonService.currentPage = '/setting-modal';
    const modal = await this.modalCtrl.create({
      component: SettingmodalPage,
      breakpoints: [0, 0.3, 0.5, 0.8],
      initialBreakpoint: 0.4
    });
    modal.onDidDismiss().then((modalItem) => {
      if (modalItem) {
        console.log(modalItem);
        if(modalItem.data!=undefined){
          
        }
        else{
          
        }
      }
    })
    return await modal.present();
  }

  async goToConnections() {
    // this.connectionFlag = true;
    if(this.search_id){
      this.commonService.currentPage = '/connection';
      console.log(this.connection_details);
      let modal = await this.modalCtrl.create({ component: ConnectionsPage, componentProps:{connections: this.connection_details, search_name:this.search_user_details.NAME }});
      modal.onDidDismiss().then((modalItem) => {
        if (modalItem) {
          
        }
      })
      return await modal.present();
    }
    else{
      this.router.navigate(['/accept-request'],  { queryParams: { routeURL: 'profile', sender_id: this.sender_id } });
    }
  }

  async openActivity() {
    // this.showFlag = false;
    const modal = await this.modalCtrl.create({
      component: MyActivityPage,
      breakpoints: [0, 0.3, 0.5, 0.8],
      initialBreakpoint: 0.3,
      cssClass: 'custom-modal'
    });
    modal.onDidDismiss().then((modalItem) => {
      if (modalItem) {
        console.log(modalItem);
        if(modalItem.data!=undefined){
          
        }
        else{
          
        }
      }
    })
    return await modal.present();
  }

  async editProfile() {
    this.commonService.currentPage = '/edit-profile';
    let modal = await this.modalCtrl.create({ component: EditProfilePage});
    modal.onDidDismiss().then((modalItem) => {console.log(modalItem);
      if (modalItem) {
        this.get_user_details();
      }
    })
    return await modal.present();
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
      this.upload_image();
      // this.album_images.push(this.selectedImage1);
      //alert(JSON.stringify(this.album_images));
    }, (err) => {
      console.log('Error obtaining picture', err);
    });
  }

  async upload_image() {
    let formData = new FormData();
    let response = await fetch(this.selectedImage.data);
    let blob = await response.blob();
    if(this.selectedImage.name==''){
      formData.append('profile_img','');
    }
    else{
      formData.append('profile_img' , blob, this.selectedImage.name); 
    }
    formData.append('type','profile_img');
    this.apiService.edit_user(this.currentUser.user_id, formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      
    },
    respError => {
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  goToadvantageDetails() {
    this.router.navigate(['/advantage-details'], { queryParams: { routeURL: 'profile', profession_id: this.user_details.PROFESSION__id } });
  }

  async zoomImage(image:string) {
    console.log(image);
    let modal = await this.modalCtrl.create({component:ViewImagePage, componentProps:{ imageUrl: this.user_details?.PROFILE_IMAGE?this.imageUrl+image:this.imageURL+image }});
    //modal.present();
    modal.onDidDismiss().then((modalItem) => {
      if (modalItem) {console.log(modalItem);
      }
    })
    return await modal.present();
  }

  dismiss() {
    console.log(this.search_id);
    if(this.routeURL=='request'){
      this.router.navigate(['/request']);
    }
    else if(this.routeURL=='acceptrequest'){
      this.router.navigate(['/accept-request'], { queryParams: { segment_type: this.segment_type, routeURL:'profile'} });
      // this.router.navigate(['/accept-request'], { queryParams: { segment_type: this.segment_type, routeURL: 'profile'} });
    }
    // else if(this.routeURL=='activity'){
    //   this.router.navigate(['/activities']);
    // }
    // else{
    //   this.router.navigate(['/dashboard']);
    // }
    else if(this.routeURL=='connections'){
      this.router.navigate(['/connection-list'], { queryParams: { searchText: this.searchText} });
    }
    // else if(this.search_id != undefined){
    //   this.router.navigate(['/globalsearchdetails'], { queryParams: { searchText: this.searchText} });
    // }
    else{
      this.router.navigate(['/dashboard']);
    }
  }

  invite_friend(reason:string) {
    let formData = new FormData();
    formData.append('full_name',this.search_user_details .NAME);
    formData.append('city',this.search_user_details.CITY__id);
    formData.append('location',this.search_user_details.LOCATION__id);
    formData.append('mobile_number',this.search_user_details.MOBILE_NO);
    formData.append('email',this.search_user_details.EMAIL_ID);
    formData.append('user_id',this.currentUser.user_id);
    formData.append('request_type','reachout');
    formData.append('custom_msg',reason);
    this.apiService.invite_friend(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
        console.log(response);
        // localStorage.setItem('currentUser',JSON.stringify(response.user_data));
        this.commonService.showToastMessage(response.message, 'success-toast','', 4000);
      },
      respError => {
        this.commonService.showToastMessage(respError, 'error-toast','', 4000);
      })
  }

  async showReachoutDialog() {
    const confirm = await this.alertCtrl.create({
      header: 'Reachout Request',
      cssClass: 'custom-alert-buttons', // Add a custom class
      inputs: [
        {
          name: 'reason',
          type: 'text',
          placeholder: 'type...'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'cancel-button', // Assign class to Cancel button
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Reachout',
          cssClass: 'reachout-button', // Assign class to Reachout button
          handler: async (data) => {
            console.log('User reason:', data.reason);
            // this.invite_friend(data.reason);
            const reason = data.reason.trim();
            if (!reason) {
              this.commonService.showToastMessage('Please enter a reason.', 'error-toast', 'top', 2000);
              return false; // Prevents the alert from closing
            }
            try {
              await this.invite_friend(reason);
              confirm.dismiss(); // ✅ Dismisses only after success
              return true; // ✅ Ensure success case returns true
            } catch (error) {
              this.commonService.showToastMessage('Submission failed. Try again.', 'error-toast', 'top', 2000);
              return false; // ❌ Keeps the alert open on failure
            }
          }
        }
      ]
    });
    await confirm.present();
  }

  

  goToSavedItems() {
    this.router.navigate(['/saved-items-list']);
  }

  async goToAccolade() {
    // this.router.navigate(['/aapasmein-accolades'], { queryParams: { routeURL: 'profile'} });
    let modal = await this.modalCtrl.create({ component: AapasmeinAccoladesPage, componentProps:{connections: this.connection_details, search_user_details:this.search_user_details }});
      modal.onDidDismiss().then((modalItem) => {
        if (modalItem) {
          
        }
      })
      return await modal.present();
  }

}
