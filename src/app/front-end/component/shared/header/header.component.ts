import {AfterViewInit, Component, HostListener, Input, OnInit} from '@angular/core';
import {ImageData} from "../../../interface/image-data";
import {AppRouter, DataOrderBy, LogoLarge, LogoShort} from "../../../constant/constants";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {SharingService} from "../../../service/sharing.service";
import {GetMangaByNameRequestDTO, GetMangaResponseDTO, MangaControllerService} from "../../../bkmanga-svc";
import {StatusCodes} from "http-status-codes";

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
  protected readonly AppRouter = AppRouter;

  protected showAuthButton: boolean
  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private sharingService: SharingService,
    private mangaControllerService: MangaControllerService
  ) {
    this.placeHolder = "Bạn muốn tìm truyện gì"
    this.logoLarge = LogoLarge
    this.logoShort = LogoShort
    this.fromGroup = formBuilder.group({
      search: [""]
    })
    this.showAuthButton = true
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

  ngOnInit(): void {
    this.sharingService.awaitDataShowAuthButton().subscribe(result => {
      this.showAuthButton = result
    })
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
      this.setSearchValueDefault()
      await this.router.navigate([AppRouter.Main, AppRouter.Search, this.fromGroup.controls['search'].value])
    }
  }
}
