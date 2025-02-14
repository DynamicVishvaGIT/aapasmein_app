import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  justLoggedIn: boolean = false; // Default to false

  constructor() { }
}
