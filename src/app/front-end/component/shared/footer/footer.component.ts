import { Component } from '@angular/core';
import {ImageDimension} from "../../../interface/image-dimension";
import {LogoLarge, LogoShort} from "../../../constant/constants";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  public logoLarge: ImageDimension

  constructor() {
    this.logoLarge = LogoLarge
  }
}
