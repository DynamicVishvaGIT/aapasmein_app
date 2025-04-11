import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.page.html',
  styleUrls: ['./agreement.page.scss'],
})
export class AgreementPage implements OnInit {

  acceptTerms:boolean = false;
  mobile_no:string='';
  referral_code:string='';
  sender_id:string='';
  
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.mobile_no = params['mobile_no'];
      this.referral_code = params['referral_code'];
      this.sender_id = params['sender_id'];
      console.log(this.sender_id);
    });
  }

  onRegiter() {
    this.router.navigate(['/registration'], { queryParams: { mobile_no:this.mobile_no, referral_code: this.referral_code!=''?this.referral_code:'', sender_id: this.sender_id} });
  }

}
