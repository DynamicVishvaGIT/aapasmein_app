import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.page.html',
  styleUrls: ['./questionnaire.page.scss'],
})
export class QuestionnairePage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  // questions = [
  //   { text: 'How long have you known Qwerty ?', options: ['0 years - 2 years', '2 years - 5 years', '5 years - 10 years', '10 years +'] },
  //   { text: 'Do you think Qwerty is a honest and trustworthy individual ?', options: ['No', 'not sure', 'somewhat', 'Yes'] },
  //   { text: 'Would you lend Qwerty money without any hesitation ?', options: ['No', 'not sure', 'Yes', 'Done that'] },
  //   { text: 'When was the last time you met Qwerty ?', options: ['1+ year ago', '6 + months ago', '1 + month ago', 'we meet all the time'] },
  //   { text: 'Do you think Qwerty is a like minded individual ?', options: ['No', 'not sure', 'yes, somewhat', 'Yes'] },
  //   { text: 'Would you like to invite Qwerty home for dinner ?', options: ['No', 'not sure', 'Yes', ' Done that'] },
  //   { text: 'Would you call Qwerty a friendly and helpful person ?', options: ['No', 'not sure', 'yes somewhat', 'Yes'] },
  //   { text: 'Have you done a satisfactory financial transaction with Qwerty ?', options: ['It was unsatisfactory ', 'not transacted', 'yes, satisfactory transaction', 'Excellent transaction'] },
  //   { text: 'Do you and Qwerty have common interests ?', options: ['No', 'not sure', 'yes, somewhat', 'Yes'] },
  //   { text: 'Is Qwerty a socially popular individual ?', options: ['No', 'not sure', 'yes, somewhat', 'Yes'] },
  //   { text: 'Are your and Qwerty`s family friends ?', options: ['No', 'not sure', 'yes, somewhat', 'Yes'] },
  //   { text: 'Is Qwerty the first to pay the bill when out for lunch / dinner ?', options: ['Never', 'Sometimes', 'Mostly', 'Always'] },
  //   { text: 'Is Qwerty highly regarded in his profession?', options: ['No', 'not sure', 'yes, somewhat', 'Yes'] },
  //   { text: 'Would you reach out to Qwerty for advice?', options: ['No', 'not sure', 'Yes', 'Done that'] },
  //   { text: 'Would you call Qwerty for assistance in an emergency?', options: ['No', 'not sure', 'Yes', 'Done that'] },
  //   { text: 'Would you call Qwerty a knowledgeable individual?', options: ['No', 'not sure', 'yes, somewhat', 'Yes'] },
  //   { text: 'Does Qwerty like to talk about people in their absence ?', options: ['always', 'mostly', 'usually not', 'Never'] },
  //   { text: 'Would you lend your car / bike to Qwerty for a weekend ?', options: ['No', 'may be', 'Yes', 'Done that'] },
  //   { text: 'Would you call Qwerty a well networked individual ?', options: ['No', 'not sure', 'yes, somewhat', 'Yes'] },
  //   { text: 'Do you think Qwerty is an achiever professionally ?', options: ['No', 'not sure', 'yes, somewhat', 'Yes'] },
  //   // Add more questions up to 25
  // ];
  questions:any=[];
  currentQuestion: number = 0;
  selectedQuestions: any[] = [];
  clickable:boolean=false;
  totalPoints = 0;
  friend_details:any;

  constructor(private router: Router, private apiService: ApiService, private commonService: CommonService, private modalCtrl: ModalController,
    private route: ActivatedRoute) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    // for (let i = 2; i <= 25; i++) {
    //   this.questions.push({ text: `Question ${i}`, options: ['Option 1', 'Option 2', 'Option 3'] });
    // }
    // this.generateQuizQuestions();
    this.route.queryParams.subscribe(params => {
      this.friend_details = JSON.parse(params['friend_details']);
      console.log(this.friend_details);
      
    });
    this.get_fixed_and_dynamic_records();
  }

  get_fixed_and_dynamic_records() {
    this.apiService.get_fixed_and_dynamic_records()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
        console.log(response);
        this.questions = response;
        this.generateQuizQuestions();
      },
      respError => {console.log(respError);
        this.commonService.presentToast(respError);
      })
  }

  generateQuizQuestions() {
    const mandatoryQuestions = this.questions.slice(0, 2);
    const remainingQuestions = this.questions.slice(2);
    this.shuffleArray(remainingQuestions);
    const randomQuestions = remainingQuestions.slice(0, 3);
    this.selectedQuestions = [...mandatoryQuestions, ...randomQuestions];
    for(let i = 0; i<this.selectedQuestions.length;i++){
      for(let j=0;j<this.selectedQuestions[i].Answer.length;j++){
        this.selectedQuestions[i].Answer[j].clickable = false;
      }
    }
  }

  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  selectOption(questionIndex: number, option: any) {
    // this.selectedQuestions[questionIndex].Answer.indexOf(option.ANSWER).clickable = true;
    option.clickable =!option.clickable;
    // Calculate the total points
    // Calculate the total points
    this.totalPoints = this.selectedQuestions.reduce((total: number, question: any) => {
      return total + question.Answer.reduce((sum: number, answer: any) => {
        return sum + (answer.clickable ? parseInt(answer.POINTS, 10) : 0);
      }, 0);
    }, 0);
    console.log(this.totalPoints);
    console.log(`Selected option for question ${questionIndex}: ${option.ANSWER}`);
    console.log(questionIndex);
    console.log(this.selectedQuestions.length);
    if (questionIndex < this.selectedQuestions.length - 1) {
      this.currentQuestion++;
    }
    else{
      this.router.navigate(['/success'], { queryParams: { totalPoints: this.totalPoints, friend_details: JSON.stringify(this.friend_details)} });
    }
  }

  dismiss() {
    // this.modalCtrl.dismiss();
    this.router.navigate(['/invitation']);
  }

}
