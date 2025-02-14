import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';
import { ReportReasonPage } from '../report-reason/report-reason.page';

@Component({
  selector: 'app-request-send',
  templateUrl: './request-send.page.html',
  styleUrls: ['./request-send.page.scss'],
})
export class RequestSendPage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  product_id:string='';
  mall_data:any=[];
  mall_data_images:any=[];
  imageUrl = 'https://aapasmein.dvadminpanel.in/media/';
  searchFlag=false;
  currentUser:any;
  wishlistFlag:boolean = false;
  wishListStatus='';
  routeURL:string='';

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private apiService: ApiService, private commonService: CommonService,
    private alertCtrl: AlertController, private modalCtrl: ModalController) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    let currentUser:any;
    currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(currentUser);
    console.log(this.currentUser);
    this.activatedRoute.queryParams.subscribe(params => {
      this.product_id = params['mall_id'];
      console.log(this.product_id);
      this.routeURL = params['routeURL'];
      console.log(this.routeURL);
      this.get_mall_products();
    });
  }

  get_mall_products() {
    let formData = new FormData();
    formData.append('user_id',this.currentUser.user_id);
    this.apiService.get_mall_products(this.product_id, formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
        console.log(response);
        this.mall_data = response.data.Mall_products[0];
        this.mall_data_images = response.data.Product_images;
        this.wishListStatus= response.data.wishlist_product_status;
        if(this.wishListStatus=='added' || this.wishListStatus!=null){
          this.wishlistFlag = false;
        }
        else{
          this.wishlistFlag = true;
        }
      },
      respError => {
        this.commonService.showToastMessage(respError, 'error-toast','', 4000);
      })
  }

  add_wishlist_product(status:string) {
    let formData = new FormData();
    formData.append('user_id',this.currentUser.user_id);
    formData.append('product_id',this.product_id);
    formData.append('status',status);
    this.apiService.add_wishlist_product(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
        console.log(response);
        this.wishlistFlag=!this.wishlistFlag;
        this.commonService.showToastMessage(response.message, 'success-toast','', 2000);
      },
      respError => {
        this.commonService.showToastMessage(respError, 'error-toast','', 4000);
      })
  }

  async showWishListDialog(status:string) {
    let showStatus='';
    let what = '';
    if(status=='added'){
      showStatus = 'Add';
      what = 'to';
    }
    else{
      showStatus = 'Removed';
      what = 'from';
    }
    const confirm = await this.alertCtrl.create({
      header: showStatus+' '+what+' wishlist',
      message: 'Do you want to '+showStatus+' this product '+what+' wishlist?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Ok, '+showStatus+' it',
          handler: () => {
            this.add_wishlist_product(status);
          }
        }
      ]
    });
   await  confirm.present();
  }

  showSearch() {
    this.searchFlag = !this.searchFlag;
  }

  // goToReport() {
  //   this.router.navigate(['/report-reason'] , { queryParams: { routeURL: 'malldetails'} });
  // }

  async goToReport() {
    const modal = await this.modalCtrl.create({
      component: ReportReasonPage,
      componentProps:{routeURL: 'malldetails', id: this.mall_data.id },
      // breakpoints: [0, 0.3, 0.5, 0.8],
      // initialBreakpoint: 0.6,
      // cssClass: 'custom-modal'
    });
    modal.onDidDismiss().then((modalItem) => {
      if (modalItem) {
        console.log(modalItem);
        if(modalItem.data!==undefined){
          
        }
        else{
        }
      }
    })
    return await modal.present();
  }

  dismiss() {
    if(this.routeURL=='malllist'){
      this.router.navigate(['/aapasmeinmall']);
    }
    else if(this.routeURL=='dashboard'){
      this.router.navigate(['/dashboard']);
    }
    else{
      this.router.navigate(['/my-mall']);
    }
  }

}
