import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login-agreement',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'otp-verification',
    loadChildren: () => import('./otp-verification/otp-verification.module').then( m => m.OtpVerificationPageModule)
  },
  {
    path: 'agreement',
    loadChildren: () => import('./agreement/agreement.module').then( m => m.AgreementPageModule)
  },
  {
    path: 'invitation',
    loadChildren: () => import('./invitation/invitation.module').then( m => m.InvitationPageModule)
  },
  {
    path: 'questionnaire',
    loadChildren: () => import('./questionnaire/questionnaire.module').then( m => m.QuestionnairePageModule)
  },
  {
    path: 'success',
    loadChildren: () => import('./success/success.module').then( m => m.SuccessPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'settingmodal',
    loadChildren: () => import('./settingmodal/settingmodal.module').then( m => m.SettingmodalPageModule)
  },
  {
    path: 'globalsearch',
    loadChildren: () => import('./globalsearch/globalsearch.module').then( m => m.GlobalsearchPageModule)
  },
  {
    path: 'globalsearchdetails',
    loadChildren: () => import('./globalsearchdetails/globalsearchdetails.module').then( m => m.GlobalsearchdetailsPageModule)
  },
  {
    path: 'aapasmeinmall',
    loadChildren: () => import('./aapasmeinmall/aapasmeinmall.module').then( m => m.AapasmeinmallPageModule)
  },
  {
    path: 'addmall',
    loadChildren: () => import('./addmall/addmall.module').then( m => m.AddmallPageModule)
  },
  {
    path: 'connections',
    loadChildren: () => import('./connections/connections.module').then( m => m.ConnectionsPageModule)
  },
  {
    path: 'yellowpages',
    loadChildren: () => import('./yellowpages/yellowpages.module').then( m => m.YellowpagesPageModule)
  },
  {
    path: 'addevent',
    loadChildren: () => import('./addevent/addevent.module').then( m => m.AddeventPageModule)
  },
  {
    path: 'addyellowpage',
    loadChildren: () => import('./addyellowpage/addyellowpage.module').then( m => m.AddyellowpagePageModule)
  },
  {
    path: 'broadcast-list',
    loadChildren: () => import('./broadcast-list/broadcast-list.module').then( m => m.BroadcastListPageModule)
  },
  {
    path: 'whatsnew-list',
    loadChildren: () => import('./whatsnew-list/whatsnew-list.module').then( m => m.WhatsnewListPageModule)
  },
  {
    path: 'addbroadcast',
    loadChildren: () => import('./addbroadcast/addbroadcast.module').then( m => m.AddbroadcastPageModule)
  },
  {
    path: 'saved-items-list',
    loadChildren: () => import('./saved-items-list/saved-items-list.module').then( m => m.SavedItemsListPageModule)
  },
  {
    path: 'community-list',
    loadChildren: () => import('./community-list/community-list.module').then( m => m.CommunityListPageModule)
  },
  {
    path: 'broadcast-details',
    loadChildren: () => import('./broadcast-details/broadcast-details.module').then( m => m.BroadcastDetailsPageModule)
  },
  {
    path: 'event-list',
    loadChildren: () => import('./event-list/event-list.module').then( m => m.EventListPageModule)
  },
  {
    path: 'event-details',
    loadChildren: () => import('./event-details/event-details.module').then( m => m.EventDetailsPageModule)
  },
  {
    path: 'community-chatbox',
    loadChildren: () => import('./community-chatbox/community-chatbox.module').then( m => m.CommunityChatboxPageModule)
  },
  {
    path: 'request',
    loadChildren: () => import('./request/request.module').then( m => m.RequestPageModule)
  },
  {
    path: 'request-send',
    loadChildren: () => import('./request-send/request-send.module').then( m => m.RequestSendPageModule)
  },
  {
    path: 'rewards',
    loadChildren: () => import('./rewards/rewards.module').then( m => m.RewardsPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'clarity-list',
    loadChildren: () => import('./clarity-list/clarity-list.module').then( m => m.ClarityListPageModule)
  },
  {
    path: 'feedback-list',
    loadChildren: () => import('./feedback-list/feedback-list.module').then( m => m.FeedbackListPageModule)
  },
  {
    path: 'add-feedback',
    loadChildren: () => import('./add-feedback/add-feedback.module').then( m => m.AddFeedbackPageModule)
  },
  {
    path: 'clarity-details',
    loadChildren: () => import('./clarity-details/clarity-details.module').then( m => m.ClarityDetailsPageModule)
  },
  {
    path: 'convenience-list',
    loadChildren: () => import('./convenience-list/convenience-list.module').then( m => m.ConvenienceListPageModule)
  },
  {
    path: 'convenience-details',
    loadChildren: () => import('./convenience-details/convenience-details.module').then( m => m.ConvenienceDetailsPageModule)
  },
  {
    path: 'add-convenience',
    loadChildren: () => import('./add-convenience/add-convenience.module').then( m => m.AddConveniencePageModule)
  },
  {
    path: 'rate-rewards-list',
    loadChildren: () => import('./rate-rewards-list/rate-rewards-list.module').then( m => m.RateRewardsListPageModule)
  },
  {
    path: 'add-rate-rewards',
    loadChildren: () => import('./add-rate-rewards/add-rate-rewards.module').then( m => m.AddRateRewardsPageModule)
  },
  {
    path: 'advantage-list',
    loadChildren: () => import('./advantage-list/advantage-list.module').then( m => m.AdvantageListPageModule)
  },
  {
    path: 'advantage-details',
    loadChildren: () => import('./advantage-details/advantage-details.module').then( m => m.AdvantageDetailsPageModule)
  },
  {
    path: 'footer-modal',
    loadChildren: () => import('./footer-modal/footer-modal.module').then( m => m.FooterModalPageModule)
  },
  {
    path: 'filter-mall',
    loadChildren: () => import('./filter-mall/filter-mall.module').then( m => m.FilterMallPageModule)
  },
  {
    path: 'filter-broadcast',
    loadChildren: () => import('./filter-broadcast/filter-broadcast.module').then( m => m.FilterBroadcastPageModule)
  },
  {
    path: 'filter-whatsnew',
    loadChildren: () => import('./filter-whatsnew/filter-whatsnew.module').then( m => m.FilterWhatsnewPageModule)
  },
  {
    path: 'my-activity',
    loadChildren: () => import('./my-activity/my-activity.module').then( m => m.MyActivityPageModule)
  },
  {
    path: 'my-mall',
    loadChildren: () => import('./my-mall/my-mall.module').then( m => m.MyMallPageModule)
  },
  {
    path: 'all-event-list',
    loadChildren: () => import('./all-event-list/all-event-list.module').then( m => m.AllEventListPageModule)
  },
  {
    path: 'accept-request',
    loadChildren: () => import('./accept-request/accept-request.module').then( m => m.AcceptRequestPageModule)
  },
  {
    path: 'aapasmein-features',
    loadChildren: () => import('./aapasmein-features/aapasmein-features.module').then( m => m.AapasmeinFeaturesPageModule)
  },
  {
    path: 'add-community',
    loadChildren: () => import('./add-community/add-community.module').then( m => m.AddCommunityPageModule)
  },
  {
    path: 'share-modal',
    loadChildren: () => import('./share-modal/share-modal.module').then( m => m.ShareModalPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'feedback-modal',
    loadChildren: () => import('./feedback-modal/feedback-modal.module').then( m => m.FeedbackModalPageModule)
  },
  {
    path: 'event-category',
    loadChildren: () => import('./event-category/event-category.module').then( m => m.EventCategoryPageModule)
  },
  {
    path: 'login-agreement',
    loadChildren: () => import('./login-agreement/login-agreement.module').then( m => m.LoginAgreementPageModule)
  },
  {
    path: 'adverting',
    loadChildren: () => import('./adverting/adverting.module').then( m => m.AdvertingPageModule)
  },
  {
    path: 'aapasmein-unwind',
    loadChildren: () => import('./aapasmein-unwind/aapasmein-unwind.module').then( m => m.AapasmeinUnwindPageModule)
  },
  {
    path: 'report-reason',
    loadChildren: () => import('./report-reason/report-reason.module').then( m => m.ReportReasonPageModule)
  },
  {
    path: 'aapasmein-wall',
    loadChildren: () => import('./aapasmein-wall/aapasmein-wall.module').then( m => m.AapasmeinWallPageModule)
  },
  {
    path: 'aapasmein-accolades',
    loadChildren: () => import('./aapasmein-accolades/aapasmein-accolades.module').then( m => m.AapasmeinAccoladesPageModule)
  },
  {
    path: 'portfolio-valuation',
    loadChildren: () => import('./portfolio-valuation/portfolio-valuation.module').then( m => m.PortfolioValuationPageModule)
  },
  {
    path: 'connection-list',
    loadChildren: () => import('./connection-list/connection-list.module').then( m => m.ConnectionListPageModule)
  },
  {
    path: 'my-aapasmein',
    loadChildren: () => import('./my-aapasmein/my-aapasmein.module').then( m => m.MyAapasmeinPageModule)
  },
  {
    path: 'view-image',
    loadChildren: () => import('./view-image/view-image.module').then( m => m.ViewImagePageModule)
  },
  {
    path: 'activities',
    loadChildren: () => import('./activities/activities.module').then( m => m.ActivitiesPageModule)
  },
  {
    path: 'send-handshake',
    loadChildren: () => import('./send-handshake/send-handshake.module').then( m => m.SendHandshakePageModule)
  },
  {
    path: 'event-view',
    loadChildren: () => import('./event-view/event-view.module').then( m => m.EventViewPageModule)
  },
  {
    path: 'enquiry-user-list',
    loadChildren: () => import('./enquiry-user-list/enquiry-user-list.module').then( m => m.EnquiryUserListPageModule)
  },
  {
    path: 'terms-condition',
    loadChildren: () => import('./terms-condition/terms-condition.module').then( m => m.TermsConditionPageModule)
  },
  {
    path: 'agreement-terms-conditions',
    loadChildren: () => import('./agreement-terms-conditions/agreement-terms-conditions.module').then( m => m.AgreementTermsConditionsPageModule)
  },
  {
    path: 'notification-convenience',
    loadChildren: () => import('./notification-convenience/notification-convenience.module').then( m => m.NotificationConveniencePageModule)
  },
  {
    path: 'interested-user-list',
    loadChildren: () => import('./interested-user-list/interested-user-list.module').then( m => m.InterestedUserListPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
