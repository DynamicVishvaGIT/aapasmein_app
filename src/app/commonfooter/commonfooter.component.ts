import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subject, Subscription, takeUntil, interval } from 'rxjs';
import { AddConveniencePage } from '../add-convenience/add-convenience.page';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';
import { FooterModalPage } from '../footer-modal/footer-modal.page';
import { InvitationPage } from '../invitation/invitation.page';
import { KeyboardService } from '../keyboard.service';
import { ProfilePage } from '../profile/profile.page';
import { YellowpagesPage } from '../yellowpages/yellowpages.page';

@Component({
  selector: 'app-commonfooter',
  templateUrl: './commonfooter.component.html',
  styleUrls: ['./commonfooter.component.scss'],
})
export class CommonfooterComponent  implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any>;

  @Input() url!: string;

  currentUser:any
  profileFlag:boolean=false;
  showFlag:boolean=false;
  handShake = false;
  isKeyboardOpen = false;
  keyboardSubscription!: Subscription;
  showFab:boolean = true;
  pollingSubscription: Subscription | null = null;
  request_list:any=[];

  constructor(private router: Router, private modalCtrl: ModalController, private keyboardService: KeyboardService, private apiService: ApiService,
    private commonService: CommonService) { 
    this._unsubscribeAll = new Subject();
    this.keyboardSubscription = this.keyboardService.keyboardStatus$.subscribe(
      (status) => {
        this.isKeyboardOpen = status;
      }
    );
  }

  ngOnInit() {
    console.log(this.url);
    let currentUser:any;
    currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(currentUser);
    console.log(this.currentUser);
    // if(this.currentUser.request_count>=4){
    //   this.handShake = true;
    // }
    // else{
    //   this.handShake = false;
    // }
    if(this.url=='invitation' || this.url=='handshake'){
      this.showFab = false;
    }
    else{
      this.showFab = true;
    }
    this.load_friend_request();
    const POLLING_INTERVAL = 5000; // 5 seconds
    // Start polling
    this.pollingSubscription = interval(POLLING_INTERVAL).subscribe(() => {
      // this.load_friend_request();
    });
  }

  load_friend_request() {
    let formData = new FormData();
    formData.append('mobile_no',this.currentUser.mobile_no);
    formData.append('request_type','invitation');
    formData.append('type','accept');
    this.apiService.load_friend_request(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.request_list = response.data;
      if(this.request_list.length>=4){
        this.handShake = true;
      }
      else{
        this.handShake = false;
      }
    },
    respError => {
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  show() {
    this.showFlag =! this.showFlag;
  }

  async inviteYourFriend() {
    this.showFab = false;
    this.router.navigate(['/invitation']);
    // let modal = await this.modalCtrl.create({ component: InvitationPage});
    // modal.onDidDismiss().then((modalItem) => {
    //   if (modalItem) {
        
    //   }
    // })
    // return await modal.present();
  }

  handshakeYourFriend() {
    this.showFab = false;
    this.router.navigate(['/send-handshake']);
  }

  goToHome() {
    this.router.navigate(['/dashboard']);
  }

  async goToProfile() {
    // let modal = await this.modalCtrl.create({ component: ProfilePage});
    // modal.onDidDismiss().then((modalItem) => {
    //   if (modalItem) {
        
    //   }
    // })
    // return await modal.present();
    this.router.navigate(['/profile']);
  }

  async goToYellowPages() {
    // let modal = await this.modalCtrl.create({ component: YellowpagesPage});
    // modal.onDidDismiss().then((modalItem) => {
    //   if (modalItem) {
        
    //   }
    // })
    // return await modal.present();
    this.router.navigate(['/yellowpages']);
  }

  async openFooter() {
    // this.showFlag = false;
    const modal = await this.modalCtrl.create({
      component: FooterModalPage,
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

  goToMall() {
    this.router.navigate(['/aapasmeinmall']);
  }
  goToEvents() {
    this.router.navigate(['/event-category']);
  }

  ngOnDestroy() {
    // Unsubscribe when the component is destroyed to avoid memory leaks
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
    this.keyboardSubscription.unsubscribe();
  }

}
