import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { ActionSheetController, ModalController, NavParams } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';
import { ConnectionsPage } from '../connections/connections.page';
import { EditProfilePage } from '../edit-profile/edit-profile.page';
import { MyActivityPage } from '../my-activity/my-activity.page';
import { SettingmodalPage } from '../settingmodal/settingmodal.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  // @Input() search_id!: string;

  search_id:string='';
  profile_details:any;
  connection_details:any;
  connectionFlag:boolean = false;
  login_details:any;
  routeURL:string='';
  selectedImage:any={name:'', data:''};
  currentUser:any;
  user_details:any;
  addAdvantage:boolean = false;
  imageUrl = 'https://aapasmein.dvadminpanel.in/media/';
  frameType: string = 'gold-frame';

  constructor(private router: Router, private modalCtrl: ModalController, private activatedRoute: ActivatedRoute, private apiService: ApiService,
    private commonService: CommonService, private actionSheetController: ActionSheetController, private camera: Camera) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    let currentUser:any;
    currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(currentUser);
    console.log(this.currentUser);
    this.activatedRoute.queryParams.subscribe(params => {
      this.search_id = params['search_id'];
      this.routeURL = params['routeURL'];
      console.log(this.routeURL);
      console.log(this.search_id);
      // this.search_keyword_details();
      if(this.search_id!=undefined){
        this.get_login_id();
      }
      else{
        this.profile_details={};
        this.get_user_details();
      }
    });
    // this.search_id = this.navParams.get('search_id');
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
    this.apiService.get_user(this.currentUser.user_id)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
        console.log('user details',response);
        this.user_details = response.user_data[0];
      },
      respError => {
        this.commonService.showToastMessage(respError, 'error-toast','', 2000);
      })
  }

  search_keyword_details() {
    this.apiService.search_keyword_details(this.search_id, this.login_details)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
        console.log('All Data',response);
        this.profile_details = response.search_user_data;
        this.connection_details = response.connection;
      },
      respError => {
        this.commonService.showToastMessage(respError, 'error-toast','', 2000);
      })
  }

  add_advantage() {
    let formData = new FormData();
    formData.append("user_id",this.currentUser.user_id),
    formData.append("status",'added'),
    this.apiService.add_advantage(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
        console.log('user details',response);
        this.addAdvantage = true;
        // this.goToadvantageDetails();
      },
      respError => {
        this.addAdvantage = true;
        this.commonService.showToastMessage(respError, 'error-toast','', 2000);
      })
  }

  async openModal() {
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
      console.log(this.connection_details);
      let modal = await this.modalCtrl.create({ component: ConnectionsPage, componentProps:{connections: this.connection_details, search_name:this.profile_details.NAME }});
      modal.onDidDismiss().then((modalItem) => {
        if (modalItem) {
          
        }
      })
      return await modal.present();
    }
    else{
      this.router.navigate(['/accept-request'],  { queryParams: { routeURL: 'profile' } });
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
    let modal = await this.modalCtrl.create({ component: EditProfilePage});
    modal.onDidDismiss().then((modalItem) => {
      if (modalItem) {
        
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
      // this.album_images.push(this.selectedImage1);
      //alert(JSON.stringify(this.album_images));
    }, (err) => {
      console.log('Error obtaining picture', err);
    });
  }

  goToadvantageDetails() {
    this.router.navigate(['/advantage-details'], { queryParams: { routeURL: 'profile', profession_id: this.user_details.PROFESSION__id } });
  }

  dismiss() {
    console.log(this.search_id);
    if(this.routeURL=='request'){
      this.router.navigate(['/request']);
    }
    // else{
    //   this.router.navigate(['/dashboard']);
    // }
    else if(this.search_id != undefined){
      this.router.navigate(['/globalsearchdetails']);
    }
    else{
      this.router.navigate(['/dashboard']);
    }
  }

  goToSavedItems() {
    this.router.navigate(['/saved-items-list']);
  }

}
