import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.page.html',
  styleUrls: ['./success.page.scss'],
})
export class SuccessPage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  currentUser:any;
  totalPoints:number=0;
  message:string='';
  friend_details: any;
  show_whatsapp:boolean=false;

  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService, private commonService: CommonService) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    let currentUser:any;
    currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(currentUser);
    console.log(this.currentUser);
    this.route.queryParams.subscribe(params => {
      this.totalPoints = params['totalPoints'];
      this.friend_details = JSON.parse(params['friend_details']);
      console.log(this.totalPoints);
      console.log(this.friend_details);
      if(this.totalPoints>=50){
        // this.message = 'Looks like '+ this.friend_details.full_name+' would be an awesome addition to the aapasmein network!';
        this.invite_friend();
      }
      else{
        this.message = 'Looks like today '+ this.friend_details.full_name+' may not be the best fit for the distinguished aapasmein network you have built. We are sure you have many more friends who will be an excellent addition to your aapasmein network.';
      }
    });
  }

  invite_friend() {
    let formData = new FormData();
    formData.append('full_name',this.friend_details.full_name);
    formData.append('city',this.friend_details.city);
    formData.append('location',this.friend_details.location);
    formData.append('mobile_number',this.friend_details.mobile_number);
    formData.append('email',this.friend_details.email);
    formData.append('user_id',this.currentUser.user_id);
    formData.append('request_type','invitation');
    this.apiService.invite_friend(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
        console.log(response);
        this.message = 'Looks like '+ this.friend_details.full_name+' would be an awesome addition to the aapasmein network!';
        this.show_whatsapp = true;
        // localStorage.setItem('currentUser',JSON.stringify(response.user_data));
        this.commonService.showToastMessage(response.message, 'success-toast','', 4000);
      },
      respError => {
        this.show_whatsapp = false;
        this.message = 'Looks like '+ this.friend_details.full_name+' has already been added to the aapasmein network!';
        this.commonService.showToastMessage(respError, 'error-toast','', 4000);
      })
  }

  invite_to_whatsapp() {
    let formData = new FormData();
    formData.append('mobile_no',this.friend_details.mobile_number);
    formData.append('sender_id',this.currentUser.user_id);
    this.apiService.invite_to_whatsapp(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
        console.log(response);
        this.inviteViaWhatsApp(response);
        // this.commonService.showToastMessage(response.message, 'success-toast','', 4000);
      },
      respError => {
        this.commonService.showToastMessage(respError, 'error-toast','', 4000);
      })
  }

  goToHome() {
    this.router.navigate(['/dashboard']);
  }

  inviteViaWhatsApp(msg:string) {
    const message = encodeURIComponent(msg);
    const phoneNumber = this.friend_details.mobile_number.replace(/\+/g, ""); // Remove '+'
    // const link = encodeURIComponent("https://your-app-link.com");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    // window.open(whatsappUrl, '_blank');
    window.open(whatsappUrl, '_system');
  }

}
