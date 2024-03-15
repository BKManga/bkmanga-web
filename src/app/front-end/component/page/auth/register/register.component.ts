import {Component, OnInit} from '@angular/core';
import {SharingService} from "../../../../service/sharing.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  private sharingService: SharingService

  constructor(sharingService: SharingService) {
    this.sharingService = sharingService;
  }

  async ngOnInit(): Promise<void> {
    await this.sharingService.setShowAuthButton(false)
  }
}
