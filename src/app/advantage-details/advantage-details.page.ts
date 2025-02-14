import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-advantage-details',
  templateUrl: './advantage-details.page.html',
  styleUrls: ['./advantage-details.page.scss'],
})
export class AdvantageDetailsPage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  advantage_list:any=[];
  searchFlag = false;
  routeURL:string='';
  profession_id:string='';
  imageUrl = 'https://aapasmein.dvadminpanel.in/media/';
  dataLoaded: boolean = false;
  // advantage_list=[{name:'Prasenjit Chanda', occupation:'Developer', image:'../../../assets/Prasenjit_Chanda.png'},
  //                     {name:'Mamta Dalvi', occupation:'Tester', image:'../../../assets/avtar6.avif'},
  //                     {name:'Akash Tupsaminder', occupation:'Developer', image:'../../../assets/avtar3.png'},
  //                     {name:'Adinath Mehtar', occupation:'Tester', image:'../../../assets/avtar5.png'},
  //                     {name:'Satyam Bandbe', occupation:'Developer', image:'../../../assets/avtar6.webp'},
  //                     {name:'Shalaka', occupation:'Tester', image:'../../../assets/avtar1.jpg'},
  //                     {name:'Mayur Sheler', occupation:'Designer', image:'../../../assets/avtar5.png'},
  //                     {name:'Mamta Dalvi', occupation:'Tester', image:'../../../assets/avtar6.avif'},
  //                     {name:'Satyam Bandbe', occupation:'Developer', image:'../../../assets/avtar6.webp'}];

  constructor(private router: Router, private activatedRoute:ActivatedRoute, private apiService: ApiService, private commonService: CommonService) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    // this.advantage_list=[{name:'Prasenjit Chanda', occupation:'Developer', image:'../../../assets/Prasenjit_Chanda.png'},
    // {name:'Mamta Dalvi', occupation:'Tester', image:'../../../assets/avtar6.avif'},
    // {name:'Akash Tupsaminder', occupation:'Developer', image:'../../../assets/avtar3.png'},
    // {name:'Adinath Mehtar', occupation:'Tester', image:'../../../assets/avtar5.png'},
    // {name:'Satyam Bandbe', occupation:'Developer', image:'../../../assets/avtar6.webp'},
    // {name:'Shalaka', occupation:'Tester', image:'../../../assets/avtar1.jpg'},
    // {name:'Mayur Sheler', occupation:'Designer', image:'../../../assets/avtar5.png'},
    // {name:'Mamta Dalvi', occupation:'Tester', image:'../../../assets/avtar6.avif'},
    // {name:'Satyam Bandbe', occupation:'Developer', image:'../../../assets/avtar6.webp'}];
    this.activatedRoute.queryParams.subscribe(params => {
      this.routeURL = params['routeURL'];
      console.log(this.routeURL);
      this.profession_id = params['profession_id'];
      console.log(this.profession_id);
    });
    this.load_advantage();
  }

  load_advantage() {
    this.dataLoaded = false;
    this.commonService.presentLoading();
    let formData = new FormData();
    formData.append("profession_id",this.profession_id),
    // formData.append("apptype",'mobile'),
    this.apiService.load_advantage(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.advantage_list = response.data;
      this.dataLoaded = true;
      this.commonService.dismissLoading();
    },
    respError => {
      this.dataLoaded = false;
      this.commonService.dismissLoading();
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  showSearch() {
    this.searchFlag = !this.searchFlag;
  }

  dismiss() {
    if(this.routeURL=='profile'){
      this.router.navigate(['/profile']);
    }
    else{
      this.router.navigate(['/advantage-list']);
    }
  }

}
