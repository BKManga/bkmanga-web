import { Component } from '@angular/core';

@Component({
  selector: 'app-result-search-header',
  templateUrl: './result-search-header.component.html',
  styleUrls: ['./result-search-header.component.scss']
})
export class ResultSearchHeaderComponent {
  public selectItem(event: MouseEvent) {
    event.stopPropagation()
    console.log("CLICK")
  }
}
