import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharingService {

  private showAuthButton = new BehaviorSubject(true)
  constructor() {
  }

  async setShowAuthButton(value: boolean) {
    this.showAuthButton.next(value)
  }

  private getShowAuthButtonValue() {
    return this.showAuthButton.asObservable()
  }

  awaitData(): Observable<boolean> {
    return this.getShowAuthButtonValue()
  }
}
