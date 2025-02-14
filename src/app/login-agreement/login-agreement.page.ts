import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-agreement',
  templateUrl: './login-agreement.page.html',
  styleUrls: ['./login-agreement.page.scss'],
})
export class LoginAgreementPage implements OnInit {

  acceptTerms:boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onAccept(){
    this.router.navigate(['/welcome']);
  }

}
