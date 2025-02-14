import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';
import { ModalController } from '@ionic/angular';
import { ReportReasonPage } from '../report-reason/report-reason.page';

@Component({
  selector: 'app-community-chatbox',
  templateUrl: './community-chatbox.page.html',
  styleUrls: ['./community-chatbox.page.scss'],
})
export class CommunityChatboxPage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  currentUser:any=[];
  chatMessages: any=[];
  editorMsg='';
  message:any={senderFullName:'Prasenjit Chanda',message:'', userIsSender:true};
  searchFlag = false;
  community_id:string='';
  disabled = false;

  // chatContainer = document.getElementById('chat-container');

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private apiService: ApiService, private commonService: CommonService,
    private modalCtrl: ModalController
  ) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.community_id = params['community_id'];
      console.log(this.community_id);
    });
    let currentUser:any;
    currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(currentUser);
    console.log(this.currentUser);
    this.load_Community_messages();
  }

  load_Community_messages() {
    let formData = new FormData();
    formData.append('community_id',this.community_id);
    this.apiService.load_Community_messages(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.chatMessages = response.data;
    },
    respError => {
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateStringFormatted = date.toLocaleDateString([], { weekday: 'short', day: 'numeric', month: 'short' });
    return `${timeString} / ${dateStringFormatted}`;
  }

  async sendMessage() {
    if (this.editorMsg == '') {
      this.commonService.showToastMessage('Please enter message.', 'error-toast', 'top', 2000);
      return;
    }
    this.disabled = true;
    let formData = new FormData();
    formData.append("message",this.editorMsg),
    formData.append("community_id",this.community_id),
    formData.append("user_id",this.currentUser.user_id),
    this.apiService.add_community_messages(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
        console.log(response);
        this.disabled = false;
        this.load_Community_messages();
        this.editorMsg = '';
        // this.commonService.showToastMessage(response.message, 'success-toast','', 2000);
      },
      respError => {
        this.disabled = false;
        console.log(respError)
        this.commonService.showToastMessage(respError, 'error-toast','', 2000);
      })
  }

  showSearch() {
    this.searchFlag = !this.searchFlag;
  }

  onFocus(){

  }

  async goToReport() {
    const modal = await this.modalCtrl.create({
      component: ReportReasonPage,
      componentProps:{routeURL: 'communitydetails', id: this.community_id },
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
    this.router.navigate(['/community-list']);
  }

}
