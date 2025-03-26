import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.page.html',
  styleUrls: ['./view-image.page.scss'],
})
export class ViewImagePage implements OnInit {

  @Input() imageUrl!: string;

  urls:any=[];
  singleurl:string='';
  // imageUrl:string='';
  url:string='';
  type:string='';

  constructor(private modalCtrl: ModalController, private activatedRoute: ActivatedRoute) { }

  config: SwiperOptions = {
    //pagination: true,
    navigation:true,
    //slidesPerView:'auto',
    //effect: 'coverflow',
    loop: true,
    //allowSlideNext:true
  }

  ngOnInit() {
    // let urls = this.navParams.get('url');
    // this.type = this.navParams.get('type');
    // this.activatedRoute.queryParams.subscribe(params => {
    //   this.imageUrl = params['url'];
    //   console.log(this.imageUrl);
    //   this.type = params['type'];
    //   console.log(this.type);
    // });
    console.log(this.type);
    console.log(this.imageUrl);
    // if(urls instanceof Array && type){alert('1');
    if(Array.isArray(this.imageUrl)){
      this.urls = this.imageUrl;
    }
    else{
      this.url = this.imageUrl;
    }
  }

  dismiss() {
    this.modalCtrl.dismiss({});
  }

}
