import { Injectable } from '@angular/core';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor(private socialSharing: SocialSharing) {}

  shareInvite(number: string, apiData: any) {
    
    const phone = number.replace(/[^0-9]/g, '');

    // Message Formatting EXACT same as required
    const message = 
    `Hi ${apiData.user_name} ! 👋,

    This is my invitation for you to become a part of the aapasmein community.

    aapasmein is an invitation only platform designed to create a no stranger environment for all its users, where you will deal only with people invited and recommended by the people you know and trust.

    Follow this exclusive invitation I have shared with you and discover the benefits of your extended circle of trust which you didn't know existed till now ! 🌿

    ${apiData.app_link}

    Use my referral code [${apiData.referral_code}] for signing up.
    `;

    // logo from API
    const logoUrl = encodeURI(apiData.app_logo);
    // const logoUrl = apiData.app_logo;
    console.log(message);
    return this.socialSharing.shareViaWhatsAppToPhone(
      phone,
      message,
      logoUrl
    );
  }

  // formatInviteMessage(apiText: string, userName: string, referralCode: string): string {
  //   // 1. Clean unwanted newlines and spaces
  //   let text = apiText.replace(/\n\s*\n/g, '\n').trim();
  
  //   // 2. Remove any excess indentation spaces
  //   text = text.replace(/\s{2,}/g, ' ');
  
  //   // 3. Apply WhatsApp formatting rules
  //   // - Bold app name
  //   // - Italic referral code
  //   // - Add emoji for friendliness
  //   text = `Hi ${userName}! 👋
  
  // ${text}
  
  // Use my referral code: *${referralCode}*
  
  // Discover the benefits of your extended circle of trust that you never knew existed! 🌿
  // `;
  
  //   return text;
  // }
}
