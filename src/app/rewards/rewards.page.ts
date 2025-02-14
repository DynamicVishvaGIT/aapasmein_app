import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.page.html',
  styleUrls: ['./rewards.page.scss'],
})
export class RewardsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  dismiss() {
    this.router.navigate(['/dashboard']);
  }

}
