import {AfterViewInit, Component, HostListener, Input, OnInit} from '@angular/core';
import {ImageData} from "../../../interface/image-data";
import {AppRouter, LogoLarge, LogoShort} from "../../../constant/constants";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {SharingService} from "../../../service/sharing.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit{

  protected placeHolder: String
  protected logoLarge: ImageData
  protected logoShort: ImageData
  protected fromGroup: FormGroup
  protected showResultSearchHeader: boolean = false
  private router: Router
  protected readonly AppRouter = AppRouter;
  protected showAuthButton: boolean
  private sharingService: SharingService
  constructor(
    formBuilder: FormBuilder,
    router: Router,
    sharingService: SharingService
  ) {
    this.placeHolder = "Bạn muốn tìm truyện gì"
    this.logoLarge = LogoLarge
    this.logoShort = LogoShort
    this.fromGroup = formBuilder.group({
      search: [""]
    })
    this.router = router
    this.showAuthButton = true
    this.sharingService = sharingService
  }

  public search() {
    console.log(this.fromGroup.controls['search'].value)
  }

  @HostListener('document:click', ['$event'])
  onClickOutsideToCloseResultBox() {
    this.showResultSearchHeader = false;
  }

  public searchRealTime() {
    console.log(this.fromGroup.controls['search'].value)
    this.showResultSearchHeader = !!this.fromGroup.controls['search'].value;
  }

  ngAfterViewInit(){

  }

  ngOnInit(): void {
    this.sharingService.awaitData().subscribe(result => {
      this.showAuthButton = result
    })
  }

  public async redirectToAuthPage(router: string) {
    await this.router.navigate([AppRouter.Auth, router])
  }

  public async redirectToMainPage() {
    await this.router.navigate([AppRouter.Main])
  }
}
