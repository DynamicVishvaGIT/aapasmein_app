import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = '';
  apptype = 'mobile';

  constructor(public httpClient: HttpClient, public commonService: CommonService) { 
    this.baseUrl = this.commonService.getBaseURL();
  }

  login(user: any) {console.log(user);
    return this.httpClient.post(this.baseUrl + 'login', user)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }
  resend_otp(user: any) {console.log(user);
    return this.httpClient.post(this.baseUrl + 'resend_otp', user)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }
  logout(user: any) {console.log(user);
    return this.httpClient.post(this.baseUrl + 'logout', user)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }
  check_user_logged_in(user: any) {
    return this.httpClient.post(this.baseUrl + 'check_user_logged_in', user)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  delete_user(user: any) {
    return this.httpClient.post(this.baseUrl + 'delete_user', user)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }
  
  load_banners() {
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('apptype', this.apptype);
    return this.httpClient.get(this.baseUrl + 'load_banners?'+urlSearchParams.toString())
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }
  add_user(user: any) {
    return this.httpClient.post(this.baseUrl + 'add_user', user)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  invite_friend(friend: any) {
    return this.httpClient.post(this.baseUrl + 'invite_friend', friend)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  load_friend_request(friend: any) {
    return this.httpClient.post(this.baseUrl + 'load_friend_request', friend)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  change_friend_request_status(friend: any) {
    return this.httpClient.post(this.baseUrl + 'change_friend_request_status', friend)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  load_hanshake_request(friend: any) {
    return this.httpClient.post(this.baseUrl + 'load_hanshake_request', friend)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  change_handshake_request_status(handshake: any) {
    return this.httpClient.post(this.baseUrl + 'change_handshake_request_status', handshake)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  get_login_id() {
    return this.httpClient.get(this.baseUrl + 'get_login_id')
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  get_fixed_and_dynamic_records() {
    return this.httpClient.get(this.baseUrl + 'get_fixed_and_dynamic_records')
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  search_keyword(searchText:string, login_id:string) {
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('apptype', this.apptype);
    // urlSearchParams.append('login_id', login_details.login_id);
    urlSearchParams.append('login_id', login_id);
    urlSearchParams.append('keyword', searchText);
    // urlSearchParams.append('maxlength', login_details.maxlength);
    urlSearchParams.append('maxlength', '5');
    return this.httpClient.get(this.baseUrl + 'search_keyword?'+urlSearchParams.toString())
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  search_keyword_details(search_id:string, login_details:any, mobile_no?:string) {console.log(mobile_no);
    let urlSearchParams = new URLSearchParams();
    // urlSearchParams.append('apptype', this.apptype);
    urlSearchParams.append('login_id', login_details.login_id);
    urlSearchParams.append('search_id', search_id);
    if(mobile_no){
      urlSearchParams.append('mobile_no',mobile_no);
    }
    // urlSearchParams.append('maxlength', '2');
    return this.httpClient.get(this.baseUrl + 'search_keyword_details?'+urlSearchParams.toString())
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  load_recent_search(login_id:string) {
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('login_id', login_id);
    return this.httpClient.get(this.baseUrl + 'load_recent_search?'+urlSearchParams.toString())
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  clear_recent_search(login_id:string) {
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('login_id', login_id);
    return this.httpClient.get(this.baseUrl + 'clear_recent_search?'+urlSearchParams.toString())
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  get_city() {
    return this.httpClient.get(this.baseUrl + 'load_city')
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  get_location() {
    return this.httpClient.get(this.baseUrl + 'load_location')
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }
  load_location(city_id:string) {
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('city_id', city_id);
    return this.httpClient.get(this.baseUrl + 'load_location?'+urlSearchParams.toString())
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }
  get_profession() {
    return this.httpClient.get(this.baseUrl + 'load_profession')
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }
  get_specialization() {
    return this.httpClient.get(this.baseUrl + 'load_specialization')
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }
  get_interest() {
    return this.httpClient.get(this.baseUrl + 'load_interest')
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  get_category() {
    return this.httpClient.get(this.baseUrl + 'load_category')
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  load_mall_products(mobile_no: string, category_id?:string) {
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('mobile_no', mobile_no);
    if(category_id){
      urlSearchParams.append('Category_id', category_id);
    }
    urlSearchParams.append('apptype', this.apptype);
    return this.httpClient.get(this.baseUrl + 'load_mall_products?'+urlSearchParams.toString())
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  load_mall_subcategory(mall_cat_id:string) {
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('mall_cat_id', mall_cat_id);
    return this.httpClient.get(this.baseUrl + 'load_mall_subcategory?'+urlSearchParams.toString())
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  add_mall_products(mall: any) {
    return this.httpClient.post(this.baseUrl + 'add_mall_products', mall)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  get_mall_products(id:string, mall?:any) {
    return this.httpClient.post(this.baseUrl + 'get_mall_products/'+id,mall)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  save_mall_products(product: any) {
    return this.httpClient.post(this.baseUrl + 'save_mall_products', product)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  load_saved_products(product: any) {
    return this.httpClient.post(this.baseUrl + 'load_saved_products', product)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  get_enquiry_user_details(id:string) {
    return this.httpClient.get(this.baseUrl + 'get_enquiry_user_details/'+id)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  add_user_enquiry(product: any) {
    return this.httpClient.post(this.baseUrl + 'add_user_enquiry', product)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  sold_delete_mall_products(product: any) {
    return this.httpClient.post(this.baseUrl + 'sold_delete_mall_products', product)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  get_user(id:string) {
    return this.httpClient.get(this.baseUrl + 'get_user/'+id)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  edit_user(id:string, user:any) {
    return this.httpClient.post(this.baseUrl + 'edit_user/'+id,user)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  add_wishlist_product(wishlist:any) {
    return this.httpClient.post(this.baseUrl + 'add_wishlist_product',wishlist)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  load_wishlist_product(wishlist:any) {
    return this.httpClient.post(this.baseUrl + 'load_wishlist_product',wishlist)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  load_event_category() {
    return this.httpClient.get(this.baseUrl + 'load_event_category')
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  load_event_subcategory(event_cat_id:string) {
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('event_cat_id', event_cat_id);
    return this.httpClient.get(this.baseUrl + 'load_event_subcategory?'+urlSearchParams.toString())
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  add_event_list(event:any) {
    return this.httpClient.post(this.baseUrl + 'add_event_list',event)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  complete_and_delete_event(event: any) {
    return this.httpClient.post(this.baseUrl + 'complete_and_delete_event', event)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  load_convenience_category() {
    return this.httpClient.get(this.baseUrl + 'load_convenience_category')
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  add_convenience(event:any) {
    return this.httpClient.post(this.baseUrl + 'add_convenience',event)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  load_convenience(convenience_category_id:string) {
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('convenience_category_id', convenience_category_id);
    urlSearchParams.append('apptype', this.apptype);
    return this.httpClient.get(this.baseUrl + 'load_convenience?'+urlSearchParams.toString())
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }
  add_advantage(advantage:any) {
    return this.httpClient.post(this.baseUrl + 'add_advantage', advantage)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }
  load_advantage(advantage:any) {
    return this.httpClient.post(this.baseUrl + 'load_advantage', advantage)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }
  load_events(mobile_no?:string, category_id?:string,user_id?:string) {console.log(user_id);
    let urlSearchParams = new URLSearchParams();
    if(mobile_no){
     urlSearchParams.append('mobile_no', mobile_no);
    }
    if(category_id){
      urlSearchParams.append('category_id', category_id);
    }
    if(user_id){
      urlSearchParams.append('user_id', user_id);
    }
    urlSearchParams.append('apptype', this.apptype);
    return this.httpClient.get(this.baseUrl + 'load_events?'+urlSearchParams.toString())
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  get_event_details(event_id:string, event:any) {
    return this.httpClient.post(this.baseUrl + 'get_event_details/'+event_id, event)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  add_interested_event(event:any) {
    return this.httpClient.post(this.baseUrl + 'add_interested_event', event)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  load_my_interested_events(event:any) {
    return this.httpClient.post(this.baseUrl + 'load_my_interested_events', event)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  add_broadcast(broadcast:any) {
    return this.httpClient.post(this.baseUrl + 'add_broadcast', broadcast)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  load_broadcast_list(mobile_no:string, category_id?:string) {
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('mobile_no', mobile_no);
    if(category_id){
      urlSearchParams.append('category_id', category_id);
    }
    urlSearchParams.append('apptype', this.apptype);
    return this.httpClient.get(this.baseUrl + 'load_broadcast_list?'+urlSearchParams.toString())
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  get_broadcast_details(id:string, broadcast:any) {
    return this.httpClient.post(this.baseUrl + 'get_broadcast_details/'+id, broadcast)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  share_broadcast(broadcast:any) {
    return this.httpClient.post(this.baseUrl + 'share_broadcast', broadcast)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  save_broadcast(broadcast:any) {
    return this.httpClient.post(this.baseUrl + 'save_broadcast', broadcast)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  load_saved_broadcast(broadcast:any) {
    return this.httpClient.post(this.baseUrl + 'load_saved_broadcast', broadcast)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  add_community(community:any) {
    return this.httpClient.post(this.baseUrl + 'add_community', community)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  load_Community() {
    return this.httpClient.get(this.baseUrl + 'load_Community')
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  add_community_messages(community:any) {
    return this.httpClient.post(this.baseUrl + 'add_community_messages', community)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  load_Community_messages(community:any) {
    return this.httpClient.post(this.baseUrl + 'load_Community_messages', community)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  add_handshake(community:any) {
    return this.httpClient.post(this.baseUrl + 'add_handshake', community)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  get_handshake(mobile_no:string,user_id:string,type:string,referral_code:string) {
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('mobile_no', mobile_no);
    if(user_id){
      urlSearchParams.append('loggedin_id',user_id);
    }
    urlSearchParams.append('type', type);
    if(referral_code!=''){
      urlSearchParams.append('refer_code', referral_code);
    }
    return this.httpClient.get(this.baseUrl + 'get_handshake?'+urlSearchParams.toString())
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  load_clarity(clarity_id:string, user_id:string) {
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('user_id', user_id);
    urlSearchParams.append('apptype', this.apptype);
    return this.httpClient.get(this.baseUrl + 'load_clarity/'+clarity_id+ '?' +urlSearchParams.toString())
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  load_faq_answers(clarity_id:number) {
    return this.httpClient.get(this.baseUrl + 'load_faq_answers/'+clarity_id)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  add_like_dislike(clarity:any) {
    return this.httpClient.post(this.baseUrl + 'add_like_dislike', clarity)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  rate_now(rate:any) {
    return this.httpClient.post(this.baseUrl + 'rate_now', rate)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }
  report_users(report:any) {
    return this.httpClient.post(this.baseUrl + 'report_users', report)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }
  add_samvaad(samvaad: any) {
    return this.httpClient.post(this.baseUrl + 'add_samvaad', samvaad)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  load_recognition(mobile_no:string) {
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('mobile_no', mobile_no);
    return this.httpClient.get(this.baseUrl + 'load_recognition?'+urlSearchParams.toString())
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  activity_api(activity: any) {
    return this.httpClient.post(this.baseUrl + 'activity_api', activity)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  invite_to_whatsapp(invite: any) {
    return this.httpClient.post(this.baseUrl + 'invite_to_whatsapp', invite)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  awards_counts(awards:any) {
    return this.httpClient.post(this.baseUrl + 'awards_counts', awards)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  load_notifications(mobile_no: string) {
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('mobile_no', mobile_no);
    return this.httpClient.get(this.baseUrl + 'load_notifications?'+urlSearchParams.toString())
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  read_notifications(notification:any) {
    return this.httpClient.post(this.baseUrl + 'read_notifications', notification)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  approve_convenience(id:string, type:string) {
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id', id);
    urlSearchParams.append('type', type);
    return this.httpClient.get(this.baseUrl + 'approve_convenience?'+urlSearchParams.toString())
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  errorHandler(error:any=Response) {console.log(error);
    let message = (error['error']) ? ((error['error'].error) ? error['error'].error : error['message']) : error['message'];
    return throwError(message || 'Remote server unreachable. Please check your Internet connection.');
  }
}
