import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-clarity-list',
  templateUrl: './clarity-list.page.html',
  styleUrls: ['./clarity-list.page.scss'],
})
export class ClarityListPage implements OnInit {
  searchFlag = false;
  routeURL:string = '';
  
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.routeURL = params['routeURL'];
    });
  }

  showSearch() {
    this.searchFlag = !this.searchFlag;
  }

  goToDetails (clarity_id:string) {
    this.router.navigate(['/clarity-details'], { queryParams: { clarity_id: clarity_id} });
  }

  dismiss() {
    if(this.routeURL=='features'){
      this.router.navigate(['/aapasmein-features']);
    }
    else{
      this.router.navigate(['/dashboard']);
    }
  }

}
