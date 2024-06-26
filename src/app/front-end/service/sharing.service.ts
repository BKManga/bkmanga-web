import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharingService {

  private showAuthButton = new BehaviorSubject(true)
  private checkAuthentication = new BehaviorSubject(false)
  private showHeaderSearch = new BehaviorSubject(true)
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

  setValueCheckAuthentication = async (value: boolean): Promise<void> => {
    this.checkAuthentication.next(value)
  }

  private getCheckAuthenticationValue = (): Observable<boolean> => {
    return this.checkAuthentication.asObservable()
  }

  awaitCheckAuthentication(): Observable<boolean> {
    return this.getCheckAuthenticationValue()
  }

  setHeaderSearch = async (value: boolean): Promise<void> => {
    this.checkAuthentication.next(value)
  }

  private getHeaderSearchValue = (): Observable<boolean> => {
    return this.checkAuthentication.asObservable()
  }

  awaitHeaderSearchValue(): Observable<boolean> {
    return this.getCheckAuthenticationValue()
  }
}
