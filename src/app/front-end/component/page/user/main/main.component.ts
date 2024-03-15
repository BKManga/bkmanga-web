import {Component, OnInit} from '@angular/core';
import {SharingService} from "../../../../service/sharing.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{
  private sharingService: SharingService

  constructor(sharingService: SharingService) {
    this.sharingService = sharingService;
  }

  async ngOnInit(): Promise<void> {
    await this.sharingService.setShowAuthButton(true)
  }
}
