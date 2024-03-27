import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {SharingService} from "../../../../service/sharing.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit{
  private sharingService: SharingService
  protected mangaCardList: Array<any> = [1, 2, 3, 4, 5, 6, 7, 8, 9,]

  constructor(sharingService: SharingService) {
    this.sharingService = sharingService
  }

  async ngOnInit(): Promise<void> {
    await this.sharingService.setShowAuthButton(true)
  }

  ngAfterViewInit(): void {
  }
}
