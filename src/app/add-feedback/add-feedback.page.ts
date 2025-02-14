import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-feedback',
  templateUrl: './add-feedback.page.html',
  styleUrls: ['./add-feedback.page.scss'],
})
export class AddFeedbackPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  dismiss() {
    this.router.navigate(['/clarity-details']);
  }

}
