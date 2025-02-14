import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// import { Swiper } from 'swiper';
import Swiper, { SwiperOptions } from 'swiper';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  @ViewChild('videoElement') videoElement!: ElementRef;

  swiperInstance?: Swiper;
  config: SwiperOptions = {
    pagination: true,
    slidesPerView:'auto',
    effect: 'coverflow',
    loop: false
  }

  // @ViewChild('swiper')
  // swiperRef: ElementRef | undefined;
  // swiper?: Swiper;
  // images: any = [{img:'../../assets/images/introduction.png'},{img:'../../assets/images/introduction2.png'},{img:'../../assets/images/introduction3.png'},{img:'../../assets/images/introduction4.png'}]

  constructor(private location: Location, private router: Router) { }

  ngOnInit() {
    // console.log(this.swiper);
    // this.swiper?.update()
    if(this.swiperInstance){
      this.swiperInstance.slideTo(0, 0);
    }
  }

  // goFullScreen(event: any) {
  //   const videoElement = event.target;
  //   if (videoElement.requestFullscreen) {
  //     videoElement.requestFullscreen();
  //   } else if (videoElement.mozRequestFullScreen) { // Firefox
  //     videoElement.mozRequestFullScreen();
  //   } else if (videoElement.webkitRequestFullscreen) { // Chrome, Safari, Opera
  //     videoElement.webkitRequestFullscreen();
  //   } else if (videoElement.msRequestFullscreen) { // IE/Edge
  //     videoElement.msRequestFullscreen();
  //   }
  // }

  // async setSwiperInstance(swiper: Swiper) {
  //   if(swiper){
  //     // setInterval(() => {
  //     //   swiper.slideNext();
  //     // }, 4000);
  //   }
  // }

  // Handles the swiper slide change event
  onSlideChange() {
    console.log(this.swiperInstance?.activeIndex);
    const video: HTMLVideoElement = this.videoElement.nativeElement;
    if (this.swiperInstance?.activeIndex == 1) {
      // If the active slide is the video slide (index 1), play the video
      if (video) {
        video.play();
      }
    } 
    else {
      // Pause the video when leaving the video slide
      if (video) {
        video.pause();
      }
    }
  }
  // onSlideChange(swiper: Swiper) {
  //   const activeIndex = swiper.activeIndex; // Get the active slide index
  //   const video: HTMLVideoElement = this.videoElement.nativeElement;
  //   console.log(activeIndex);
  //   if (activeIndex == 1) {
  //     // If the active slide is the video slide (index 1), play the video
  //     if (video) {
  //       video.play();
  //     }
  //   } else {
  //     // Pause the video when leaving the video slide
  //     if (video) {
  //       video.pause();
  //     }
  //   }
  // }

  setSwiperInstance(swiper: Swiper) {
    this.swiperInstance = swiper;
    console.log(this.swiperInstance.activeIndex);
    const video: HTMLVideoElement = this.videoElement.nativeElement;
    if(this.swiperInstance.activeIndex==0){

    // Pause the video when the slide changes
    if (video) {
      video.pause();
    }
    }
  }

  goNext() {
    if (this.swiperInstance) {
      this.swiperInstance.slideNext();  // Moves to the next slide
    }
  }

  // ionViewDidEnter(){
  //   console.log(this.swiper);
  //   this.swiper?.update()
  // }

  back() {
    // window.history.back();
    // this.location.back();
  }

  login(){
    if(this.swiperInstance){
      this.swiperInstance.slideTo(0, 0);
    }
    this.router.navigate(['/login']);
  }

  onSwiper(swiper:any) {
    swiper.update();
  }

}
