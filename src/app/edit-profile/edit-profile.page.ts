import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonPopover, ModalController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  @ViewChild('professionPopover') professionPopover!: IonPopover;

  currentUser:any;
  user_details:any;
  searchFlag = false;
  // user:any={edit_name:'', edit_city:'',edit_location:'',edit_mobile_no:'',edit_email_id:'',edit_profession:'',edit_specialization:'',edit_interest:''};
  user:any={edit_name:'', edit_city:'',edit_location:'',edit_mobile_no:'',edit_email_id:'',edit_profession:'',edit_specialization:'', edit_interest:''};
  inputFocused: boolean = false;
  get_cities:any = [];
  get_locations:any = [];
  get_professions:any = [];
  get_specializations:any = [];
  get_interests:any = [];

  selectedProfessionName = '';
  searchTerm = '';
  filteredProfessions :any[] = [];
  isPopoverOpen = false;

  constructor(private router: Router, private apiService: ApiService, private commonService: CommonService, private modalCtrl: ModalController) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    let currentUser:any;
    currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(currentUser);
    console.log(this.currentUser);
    this.get_city();
    // this.get_location();
    this.get_profession();
    this.get_specialization();
    this.get_interest();
    this.get_user_details();
  }

  get_city() {
    this.apiService.get_city()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.get_cities = response.data;
      // this.get_cities.unshift({id:'',NAME:'Select City'});
    },
    respError => {
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }
  load_location() {
    this.apiService.load_location(this.user.edit_city)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.get_locations = response.data;
      // this.get_locations.unshift({id:'',NAME:'Select Location'});
    },
    respError => {
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }
  get_profession() {
    this.apiService.get_profession()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.get_professions = response.data;
      this.filteredProfessions = [...this.get_professions];
      // this.get_professions.unshift({id:'',NAME:'Select Profession'});
    },
    respError => {
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  filterProfessions() {
    this.filteredProfessions = this.get_professions.filter((item:any) =>
      item.NAME.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  selectProfession(item: any) {console.log(item);
    this.user.edit_profession = item.id;
    this.selectedProfessionName = item.NAME;
    this.isPopoverOpen = false;
  }

  openPopover(event: Event) {
    this.isPopoverOpen = true;
  }
  get_specialization() {
    this.apiService.get_specialization()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.get_specializations = response.data;
      // this.get_specializations.unshift({id:'',NAME:'Select Specialization'});
    },
    respError => {
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }
  get_interest() {
    this.apiService.get_interest()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.get_interests = response.data;
      // this.get_interests.unshift({id:'',NAME:'Select Interest'});
    },
    respError => {
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  get_user_details() {
    this.apiService.get_user(this.currentUser.user_id)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
        console.log('user details',response);
        this.user_details = response.user_data[0];
        this.user.edit_name = this.user_details.NAME;
        this.user.edit_city = this.user_details.CITY__id;
        this.load_location();
        this.user.edit_location = this.user_details.LOCATION__id;
        this.user.edit_mobile_no = this.user_details.MOBILE_NO;
        this.user.edit_email_id = this.user_details.EMAIL_ID;
        this.user.edit_profession = this.user_details.PROFESSION__id;
        this.selectedProfessionName = this.user_details.PROFESSION__NAME;
        // this.user.edit_specialization = this.user_details.SPECIALIZATION__NAME;
        this.user.edit_specialization = this.user_details.SPECIALIZATION;
        // this.user.edit_interest = this.user_details.INTEREST_NAME;
        this.user.edit_interest = this.user_details.INTEREST_NAME.split(',').map((interest:any) => interest.trim());
        // if (typeof this.user_details.INTEREST_NAME === 'string') {
        //   this.user.edit_interest = this.user_details.INTEREST_NAME.split(',').map(Number);
        // }

      },
      respError => {
        this.commonService.showToastMessage(respError, 'error-toast','', 2000);
      })
  }

  update_user() {
    if (this.user.edit_name == '') {
      this.commonService.showToastMessage('Please enter name.', 'error-toast', 'top', 2000);
      return;
    }
    if (this.user.edit_city == '') {
      this.commonService.showToastMessage('Please select district.', 'error-toast', 'top', 2000);
      return;
    }
    if (this.user.edit_location == '') {
      this.commonService.showToastMessage('Please select city.', 'error-toast', 'top', 2000);
      return;
    }
    if (this.user.edit_mobile_no == '') {
      this.commonService.showToastMessage('Please enter mobile number.', 'error-toast', 'top', 2000);
      return;
    }
    let mpattern = /(^\d{10}$)/;
    if (!mpattern.test(this.user.edit_mobile_no)) {
      this.commonService.showToastMessage('Please enter phone number in correct format.', 'error-toast', 'top', 2000);
      return;
    }
    if (this.user.edit_email_id == '') {
      this.commonService.showToastMessage('Please enter email-id.', 'error-toast', 'top', 2000);
      return;
    }
    let epattern = /[A-Za-z0-9._%+-]{1,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})/;
    if (!epattern.test(this.user.edit_email_id)) {
      this.commonService.showToastMessage('Please enter email in correct format.', 'error-toast', 'top', 2000);
      return;
    }
    if (this.user.edit_profession == '') {
      this.commonService.showToastMessage('Please select profession.', 'error-toast', 'top', 2000);
      return;
    }
    if (this.user.edit_specialization == '') {
      this.commonService.showToastMessage('Please enter specialization.', 'error-toast', 'top', 2000);
      return;
    }
    let formData = new FormData();
    formData.append("edit_name",this.user.edit_name),
    formData.append("edit_city",this.user.edit_city),
    formData.append("edit_location",this.user.edit_location),
    formData.append("edit_mobile_no",this.user.edit_mobile_no),
    formData.append("edit_email_id",this.user.edit_email_id),
    formData.append("edit_profession",this.user.edit_profession),
    formData.append("edit_specialization",this.user.edit_specialization),
    formData.append("type",'edit_details')
    for(let i=0;i<this.user.edit_interest.length;i++){
      formData.append('edit_interest' , this.user.edit_interest[i]); 
    }
    // formData.append("edit_interest",this.user.edit_interest),
    this.apiService.edit_user(this.currentUser.user_id, formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.dismiss();
      
    },
    respError => {
      this.commonService.showToastMessage(respError, 'error-toast','', 4000);
    })
  }

  onEdit() {

  }

  showSearch() {
    this.searchFlag = !this.searchFlag;
  }

  dismiss() {
    // this.router.navigate(['/profile']);
    this.modalCtrl.dismiss();
  }

}
