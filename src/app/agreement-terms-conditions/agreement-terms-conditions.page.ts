import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-agreement-terms-conditions',
  templateUrl: './agreement-terms-conditions.page.html',
  styleUrls: ['./agreement-terms-conditions.page.scss'],
})
export class AgreementTermsConditionsPage implements OnInit {

  route: string = '';

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.route = params['route'];
    });
  }

  close(){
    if(this.route=='login'){
      this.router.navigate(['/login-agreement']);
    }
    else{
      this.router.navigate(['/terms-condition']);
    }
  }

}
