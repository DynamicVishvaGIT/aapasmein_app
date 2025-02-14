import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aapasmein-features',
  templateUrl: './aapasmein-features.page.html',
  styleUrls: ['./aapasmein-features.page.scss'],
})
export class AapasmeinFeaturesPage implements OnInit {

  searchFlag = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  showSearch() {
    this.searchFlag = !this.searchFlag;
  }

  goToRequestList() {
    this.router.navigate(['/request'], { queryParams: { routeURL: 'features'} });
  }
  goToCommunityList() {
    this.router.navigate(['/community-list'], { queryParams: { routeURL: 'features'} });
  }
  goToEventList() {
    this.router.navigate(['/event-category'], { queryParams: { routeURL: 'features'} });
  }
  // goToNotification() {
  //   this.router.navigate(['/notifications'], { queryParams: { routeURL: 'features'} });
  // }
  // goToRewards() {
  //   this.router.navigate(['/rewards'], { queryParams: { routeURL: 'features'} });
  // }
  goToClarityList() {
    this.router.navigate(['/clarity-list'], { queryParams: { routeURL: 'features'} });
  }
  goToConvenienceList() {
    this.router.navigate(['/convenience-list'], { queryParams: { routeURL: 'features'} });
  }
  goToRateList() {
    this.router.navigate(['/rate-rewards-list'], { queryParams: { routeURL: 'features'} });
  }
  goToAdvantageList() {
    this.router.navigate(['/advantage-list'], { queryParams: { routeURL: 'features'} });
  }
  // goToConvenienceDetails() {
  //   this.router.navigate(['/convenience-details'], { queryParams: { url: 'features'} });
  // }
  goToAccolade() {
    this.router.navigate(['/aapasmein-accolades'], { queryParams: { routeURL: 'features'} });
  }
  goToAppasmeinMall() {
    this.router.navigate(['/aapasmeinmall'], { queryParams: { routeURL: 'features'} });
  }
  async goToBroadcastList() {
    this.router.navigate(['/broadcast-list'], { queryParams: { routeURL: 'features'} });
  }
  async goToUnwind() {
    this.router.navigate(['/aapasmein-unwind'], { queryParams: { routeURL: 'features'} });
  }
  async goToSamvaad() {
    this.router.navigate(['/feedback-modal'], { queryParams: { routeURL: 'features'} });
  }

  dismiss() {
    this.router.navigate(['/dashboard']);
  }

}
