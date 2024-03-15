import { Component } from '@angular/core';
import {ImageData} from "../../../interface/image-data";
import {LogoLarge, LogoShort} from "../../../constant/constants";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  public logoLarge: ImageData

  constructor() {
    this.logoLarge = LogoLarge
  }
}
