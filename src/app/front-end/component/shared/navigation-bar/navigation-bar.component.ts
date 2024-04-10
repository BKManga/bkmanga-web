import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {AppRouter} from "../../../constant/constants";
import {Router} from "@angular/router";
import {SharingService} from "../../../service/sharing.service";
import {ApiResponseListGenre, Genre, GenreControllerService} from "../../../bkmanga-svc";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit, AfterViewInit{

  iconExtend: string
  isOpenMenu: boolean
  showExtendMenu: boolean
  private genreControllerService: GenreControllerService
  listGenre: Array<Genre> = Array<Genre>()

  classShowExtendValue: string = ''

  protected showNavigationBar: boolean

  constructor(
    private router: Router,
    private sharingService: SharingService,
    genreControllerService: GenreControllerService
  ) {
    this.iconExtend = "menu"
    this.isOpenMenu = true
    this.showExtendMenu = true
    this.showNavigationBar = true
    this.genreControllerService = genreControllerService
  }

  async showHideMenuExtend() {
    this.isOpenMenu = !this.isOpenMenu
    this.showExtendMenu = !this.showExtendMenu
    this.setIconExtend()
    await this.setClassShowExtendValue()
  }

  private setIconExtend() {
    this.iconExtend = this.isOpenMenu ? "cancel_presentation" : "menu"
  }

  private async setClassShowExtendValue() {
    this.classShowExtendValue = this.showExtendMenu ? 'navigation-bar__extend_open' : ''
  }

  @HostListener('window:resize', ['$event'])
  async onResize() {
    if (window.innerWidth >= 1100 && this.isOpenMenu) {
      this.isOpenMenu = false
      this.showExtendMenu = false
      this.setIconExtend()
      await this.setClassShowExtendValue()
    }
  }

  async ngAfterViewInit(): Promise<void> {
    await this.onResize()
  }

  async ngOnInit(): Promise<void> {
    this.sharingService.awaitDataShowAuthButton().subscribe(result => {
      this.showNavigationBar = result
    })

    // this.genreControllerService.getAllGenre().subscribe((result: ApiResponseListGenre) => {
    //   if (result?.responseCode === 200) {
    //     this.listGenre = result?.result ?? []
    //   }
    // })
  }

  public async redirectToMainPage() {
    await this.router.navigate([AppRouter.Main])
  }

  public showExtendGenre() {

  }
}
