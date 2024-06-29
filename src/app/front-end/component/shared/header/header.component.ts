import {AfterViewInit, Component, HostListener, Input, OnInit} from '@angular/core';
import {ImageData} from "../../../interface/image-data";
import {
  AppRouter,
  AuthToken,
  DataOrderBy, GetImage,
  LogoLarge,
  LogoShort,
  MiddlePrefixHandleImage
} from "../../../constant/constants";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, NavigationEnd, Router, RouterEvent} from "@angular/router";
import {SharingService} from "../../../service/sharing.service";
import {GetMangaByNameRequestDTO, GetMangaResponseDTO, MangaControllerService} from "../../../bkmanga-svc";
import {StatusCodes} from "http-status-codes";
import {CookieService} from "ngx-cookie-service";
import {JwtDecodeService} from "../../../service/jwt-decode.service";
import {DialogService} from "../../../service/dialog.service";
import {filter} from "rxjs";
import {environment} from "../../../../../environments/environment.development";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit{

  placeHolder: String
  logoLarge: ImageData
  logoShort: ImageData

  fromGroup: FormGroup

  showResultSearchHeader: boolean
  showInputHeaderSearch: boolean
  readonly AppRouter = AppRouter

  checkAuthentication?: boolean

  protected showAuthButton?: boolean
  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private sharingService: SharingService,
    private mangaControllerService: MangaControllerService,
    private cookieService: CookieService,
    private jwtDecodeService: JwtDecodeService,
    private dialogService: DialogService,
    private activeRoute: ActivatedRoute,
  ) {
    this.placeHolder = "Bạn muốn tìm truyện gì"
    this.logoLarge = LogoLarge
    this.logoShort = LogoShort
    this.fromGroup = formBuilder.group({
      search: [""]
    })
    this.showInputHeaderSearch = true
    this.showResultSearchHeader = false
    this.jwtDecodeService.checkToken().subscribe((value) => {
      this.checkAuthentication = value
    })

  }

  mangaList: Array<GetMangaResponseDTO> = new Array<GetMangaResponseDTO>();

  @HostListener('document:click', ['$event'])
  onClickOutsideToCloseResultBox() {
    this.showResultSearchHeader = false;
  }

  @HostListener('window:resize', ['$event'])
  async onResize() {
  }

  public searchRealTime() {

    let valueSearch = this.fromGroup.controls['search'].value.trim()

    this.showResultSearchHeader = !!valueSearch

    if (this.showResultSearchHeader) {

      let getMangaByNameRequestDTO: GetMangaByNameRequestDTO = {
        name: valueSearch,
        otherName: valueSearch,
        page: 0,
        size: 10,
        orderBy: DataOrderBy.ASC,
      }

      this.mangaControllerService.searchMangaByName(getMangaByNameRequestDTO).subscribe(
        (response) => {
          if (response.responseCode === StatusCodes.OK) {
            this.mangaList = response.result?.content ?? []
          }
      })
    }
  }

  async ngAfterViewInit(){
    await this.onResize()
  }

  async ngOnInit(): Promise<void> {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(
      (event) => {
        event as NavigationEnd
        if (event instanceof NavigationEnd) {
          this.showInputHeaderSearch = !event.url.includes(AppRouter.Login) && !event.url.includes(AppRouter.Register)
          this.showAuthButton = !event.url.includes(AppRouter.Login) && !event.url.includes(AppRouter.Register)
        }
      }
    )
  }

  setSearchValueDefault = () => {
    this.showResultSearchHeader = false
    this.fromGroup.controls['search'].setValue("")
  }

  redirectToAuthPage = async (router: string) : Promise<void> => {
    await this.router.navigate([AppRouter.Auth, router])
  }

  redirectToMainPage = async () : Promise<void> => {
    await this.router.navigate([AppRouter.Main])
  }

  redirectToSearchPage = async () : Promise<void> => {
    if (this.fromGroup.controls['search'].value.trim()) {
      await this.router.navigate([AppRouter.Main, AppRouter.Search, this.fromGroup.controls['search'].value])
      this.setSearchValueDefault()
    }
  }

  redirectToProfilePage = async () : Promise<void> => {
    await this.router.navigate([AppRouter.Main, AppRouter.Profile])
  }

  protected readonly MiddlePrefixHandleImage = MiddlePrefixHandleImage;
  protected readonly GetImage = GetImage;
  protected readonly environment = environment;
}
