import { Component } from '@angular/core';
import {ImageDimension} from "../../../interface/image-dimension";
import {LogoLarge, LogoShort} from "../../../constant/constants";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  placeHolder: String

  logoLarge: ImageDimension

  logoShort: ImageDimension

  showInputShort: boolean = true

  fromGroup: FormGroup

  constructor(
    formBuilder: FormBuilder
  ) {
    this.placeHolder = "Bạn muốn tìm truyện gì"
    this.logoLarge = LogoLarge
    this.logoShort = LogoShort
    this.fromGroup = formBuilder.group({
      search: [""]
    })
  }

  public handleInputShort() {
    this.showInputShort = !this.showInputShort;
  }

  public search() {
    console.log(this.fromGroup.controls['search'].value)
  }

  public searchRealTime() {
    console.log(this.fromGroup.controls['search'].value)
  }
}
