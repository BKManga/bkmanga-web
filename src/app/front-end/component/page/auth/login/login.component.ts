import {Component, OnInit, Output} from '@angular/core';
import {SharingService} from "../../../../service/sharing.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit{

  private sharingService: SharingService

  constructor(sharingService: SharingService) {
    this.sharingService = sharingService;
  }

  async ngOnInit(): Promise<void> {
    await this.sharingService.setShowAuthButton(false)
  }
}
