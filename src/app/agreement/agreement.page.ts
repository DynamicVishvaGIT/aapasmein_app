import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.page.html',
  styleUrls: ['./agreement.page.scss'],
})
export class AgreementPage implements OnInit {

  acceptTerms:boolean = false;
  
  constructor(private router: Router) { }

  ngOnInit() {
  }

  onRegiter() {
    this.router.navigate(['/registration']);
  }

}
