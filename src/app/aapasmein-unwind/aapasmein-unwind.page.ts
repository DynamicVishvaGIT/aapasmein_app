import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swiper, { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-aapasmein-unwind',
  templateUrl: './aapasmein-unwind.page.html',
  styleUrls: ['./aapasmein-unwind.page.scss'],
})
export class AapasmeinUnwindPage implements OnInit {

  currentUser:any;
  info = 'trivia';
  selectedSegment: string = 'trivia';
  config: SwiperOptions = {
    pagination: true,
    slidesPerView:'auto',
    effect: 'coverflow',
    loop: true
  }
  today=new Date();
  routeURL:string='';

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.routeURL = params['routeURL'];
      console.log(this.routeURL);
    });
  }

  async setSwiperInstance(swiper: Swiper) {
    if(swiper){
      setInterval(() => {
        swiper.slideNext();
      }, 4000);
    }
  }

  dismiss() {
    if(this.routeURL=='features'){
      this.router.navigate(['/aapasmein-features']);
    }
    else{
      this.router.navigate(['/dashboard']);
    }
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

}
