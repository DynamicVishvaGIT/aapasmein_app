import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-clarity-details',
  templateUrl: './clarity-details.page.html',
  styleUrls: ['./clarity-details.page.scss'],
})
export class ClarityDetailsPage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  currentUser:any;
  clarity_id:string='';
  searchFlag=false;
  clarity_cards:any=[];
  clarity_title:any={TITLE:'',DESCRIPTION:''};
  clarity_faqQuestions:any=[];
  clarity_faqAnswers:any=[];
  imageUrl = 'https://aapasmein.dvadminpanel.in/media/';
  isContentVisible: { [key: number]: boolean } = {};
  isLiked = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private apiService: ApiService, private commonService: CommonService,
    private iab: InAppBrowser) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.clarity_id = params['clarity_id'];
      console.log(this.clarity_id);
    });
    let currentUser:any;
    currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(currentUser);
    console.log(this.currentUser);
    this.load_clarity();
  }

  toggleContent(questionId: number) {
    // Check if the selected question is currently visible
    const isCurrentlyVisible = this.isContentVisible[questionId];
    // Set all questions' content visibility to false
    Object.keys(this.isContentVisible).forEach(id => {
      this.isContentVisible[+id] = false;
    });
    // Toggle the content visibility for the selected question only
    // this.isContentVisible[questionId] = true;
    this.isContentVisible[questionId] = !isCurrentlyVisible;
    if(this.isContentVisible[questionId]){
      this.load_faq_answers(questionId);
    }
  }

  load_clarity() {
    // let formData = new FormData();
    // formData.append('user_id',this.currentUser.user_id);
    this.commonService.presentLoading();
    this.apiService.load_clarity(this.clarity_id, this.currentUser.user_id)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.clarity_title = response.data.main_title;
      this.clarity_cards = response.data.cards;
      for(let i=0;i<this.clarity_cards.length;i++){
        this.clarity_cards[i].CLARITY_VIDEO_ID = this.extractYouTubeId(this.clarity_cards[i].CLARITY_IMAGES);
      }
      if(response.data.faq.length>0){
        this.clarity_faqQuestions = response.data.faq;
        this.isContentVisible[this.clarity_faqQuestions[0].id] = true;
        this.load_faq_answers(this.clarity_faqQuestions[0].id);
      }
      this.commonService.dismissLoading();
      
    },
    respError => {
      this.commonService.dismissLoading();
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  load_faq_answers(questionId: number) {
    this.apiService.load_faq_answers(questionId)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.clarity_faqAnswers = response;
      // this.commonService.dismissLoading();
    },
    respError => {
      this.commonService.dismissLoading();
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  add_like_dislike(type:string, data: any, status:string) {console.log(data);
    console.log(status);
    let formData = new FormData();
    formData.append('user_id',this.currentUser.user_id);
    if(type=='card'){
      formData.append('source','card');
    }
    else{
      formData.append('source','faq');
    }
    formData.append('parent_id',data.id);
    if(status=='liked'){
      formData.append('status',status);
    }
    else{
      formData.append('status',status);
    }
    this.apiService.add_like_dislike(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      if(type=='card'){
        if(status=='liked'){
          data.isLiked = !data.isLiked;
          data.isDisLiked = false;
        }
        if(status=='disliked'){
          data.isDisLiked = !data.isDisLiked;
          data.isLiked = false;
        }
      }
      if(type=='faq'){
        if(status=='liked'){
          data.isLiked = !data.isLiked;
          data.isDisLiked = false;
        }
        if(status=='disliked'){
          data.isDisLiked = !data.isDisLiked;
          data.isLiked = false;
        }
      }
    },
    respError => {
      this.commonService.dismissLoading();
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  getAnswerForQuestion(questionId: number): string {
    const answerData = this.clarity_faqAnswers.find((answer:any) => answer.id === questionId);
    return answerData ? answerData.ANSWER : 'Loading...'; // Return answer or loading state
  }

  showSearch() {
    this.searchFlag=!this.searchFlag;
  }

  // goToFeedback() {
  //   this.router.navigate(['/add-feedback']);
  // }

  goToSamvaad() {
    this.router.navigate(['/feedback-modal'] , { queryParams: { routeURL: 'claritydetails'} });
  }

  dismiss() {
    this.router.navigate(['/clarity-list']);
  }

  openYouTube(url: string) {
    const videoId = this.extractYouTubeId(url);
    const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
    this.iab.create(youtubeUrl, '_system'); // Opens in the system's default browser or app
  }

  // Extract YouTube video ID
  extractYouTubeId(url: string): string {
    const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]+)/;
    const match = url.match(regex);
    return match && match[1] ? match[1] : '';
  }

  // Get YouTube thumbnail URL
  getYouTubeThumbnail(url: string): string {
    const videoId = this.extractYouTubeId(url);
    return `https://img.youtube.com/vi/${videoId}/0.jpg`;
  }

  // getYouTubeThumbnail(url: string): string {
  //   // Extract video ID from the URL
  //   const videoId = this.extractYouTubeId(url);
  //   // Return the YouTube thumbnail URL
  //   return `https://img.youtube.com/vi/${videoId}/0.jpg`;
  // }

  // extractYouTubeId(url: string): string {
  //   // Extract video ID from the YouTube URL
  //   const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]+)/;
  //   const match = url.match(regex);
  //   return match && match[1] ? match[1] : '';
  // }

}
