import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharingService {

  private showAuthButton = new BehaviorSubject(true)
  constructor() {
  }

  setShowAuthButton = async (value: boolean): Promise<void> => {
    this.showAuthButton.next(value)
  }

  private getShowAuthButtonValue = (): Observable<boolean> => {
    return this.showAuthButton.asObservable()
  }

  awaitDataShowAuthButton(): Observable<boolean> {
    return this.getShowAuthButtonValue()
  }
}
