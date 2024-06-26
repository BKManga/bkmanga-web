import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollPageService {

  constructor() { }

  public scrollTopPage = () => {
    window.scroll(0, 0)
  }
}
