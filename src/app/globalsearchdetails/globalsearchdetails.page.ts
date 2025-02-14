import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';
import { GlobalsearchPage } from '../globalsearch/globalsearch.page';
import { ProfilePage } from '../profile/profile.page';

@Component({
  selector: 'app-globalsearchdetails',
  templateUrl: './globalsearchdetails.page.html',
  styleUrls: ['./globalsearchdetails.page.scss'],
})
export class GlobalsearchdetailsPage implements OnInit {

  // @Input() searchText!: string;

  private _unsubscribeAll: Subject<any>;

  searchText:string = '';
  search_details:any=[];
  myTimeout:any;
  login_details:any;
  currentUser:any;
  // images:any=['avtar1.png','Prasenjit_Chanda.png','avtar3.jpeg'];

  constructor(private modalCtrl: ModalController, private apiService: ApiService, private commonService: CommonService,
    private router: Router, private activatedRoute: ActivatedRoute) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    // this.searchText = this.navParams.get('searchText');
    console.log(this.searchText);
    let currentUser:any;
    currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(currentUser);
    console.log(this.currentUser);
    this.activatedRoute.queryParams.subscribe(params => {
      this.searchText = params['searchText'];
      console.log(this.searchText);
      // this.get_login_id();
      this.search_keyword();
    });
  }

  // onSearch(ev:any, type:string) {
  //   this.myTimeout = setTimeout(() => {
  //     this.goToSearch(ev, type); 
  //     }, 1000);
  // }

  // async goToSearch(ev:any, type:string) {
  //   console.log(ev.target.value);
  //   let modal = await this.modalCtrl.create({ component: GlobalsearchPage, componentProps:{searchText: ev.target.value, type:type }});
  //   //modal.present();
  //   modal.onDidDismiss().then((modalItem) => {
  //     if (modalItem) {
  //       //console.log(modalItem.data.signedUser);
        
  //     }
  //   })
  //   return await modal.present();
  // }

  get_login_id() {
    this.apiService.get_login_id()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
        console.log('Login Id',response);
        this.login_details = response;
        console.log(this.login_details);
        this.search_keyword();
      },
      respError => {
        this.commonService.showToastMessage(respError, 'error-toast','', 2000);
      })
  }

  search_keyword() {
    this.search_details=[];
    this.apiService.search_keyword(this.searchText, this.currentUser.user_id)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
        console.log('All Data',response);
        for(let i=0;i<response.length;i++){
          response[i].image = 'avtar3.jpeg';
        }
        this.search_details = response;
        console.log(this.search_details);
      },
      respError => {
        this.commonService.showToastMessage(respError, 'error-toast','', 2000);
      })
  }

  // async goToProfileDetails(search_id:string) {
  //   let modal = await this.modalCtrl.create({ component: ProfilePage, componentProps:{search_id: search_id }});
  //   modal.onDidDismiss().then((modalItem) => {
  //     if (modalItem) {
        
  //     }
  //   })
  //   return await modal.present();
  // }

  goToProfileDetails(search_id:string) {
    // this.modalCtrl.dismiss();
    this.router.navigate(['/profile'], { queryParams: { search_id: search_id} });
  }

  backToSearch() {
    // this.modalCtrl.dismiss();
    this.router.navigate(['/globalsearch']);
  }

}
