import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  RendererStyleFlags2,
  ViewChild
} from '@angular/core';
import {AppRouter} from "../../../constant/constants";
import {NavigationEnd, Router} from "@angular/router";
import {SharingService} from "../../../service/sharing.service";
import {ApiResponseListGenre, Genre, GenreControllerService} from "../../../bkmanga-svc";
import {filter} from "rxjs";

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
  @ViewChild('extendGenre') private readonly extendGenre: ElementRef | undefined

  classShowExtendValue: string = ''

  showNavigationBar: boolean

  constructor(
    private router: Router,
    private sharingService: SharingService,
    genreControllerService: GenreControllerService,
    private renderer: Renderer2,
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

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(
      (event) => {
        event as NavigationEnd
        if (event instanceof NavigationEnd) {
          this.showNavigationBar = !event.url.includes(AppRouter.Login) && !event.url.includes(AppRouter.Register)
        }
      }
    )

    this.genreControllerService.getAllGenre().subscribe((result: ApiResponseListGenre) => {
      if (result?.responseCode === 200) {
        this.listGenre = result?.result ?? []
      }
    })
  }

  redirectToMainPage = async () : Promise<void> => {
    await this.resetNavigationBarComponentWhenRedirect()
    await this.router.navigate([AppRouter.Main])
  }

  redirectToFilterPage = async () : Promise<void> => {
    await this.resetNavigationBarComponentWhenRedirect()
    await this.router.navigate([AppRouter.Main, AppRouter.Filter])
  }

  redirectToFollowPage = async () : Promise<void> => {
    await this.resetNavigationBarComponentWhenRedirect()
    await this.router.navigate([AppRouter.Main, AppRouter.Follow])
  }

  redirectToHistoryPage = async () : Promise<void> => {
    await this.resetNavigationBarComponentWhenRedirect()
    await this.router.navigate([AppRouter.Main, AppRouter.History])
  }

  redirectToGenrePage = async (idGenre: number | undefined) : Promise<void> => {
    if (!idGenre) return
    await this.resetNavigationBarComponentWhenRedirect()
    await this.router.navigate([AppRouter.Main, AppRouter.Genre, idGenre])
  }

  private resetNavigationBarComponentWhenRedirect = async () : Promise<void> => {
    if (window.innerWidth >= 1100) {
      if (this.extendGenre) {
        // this.renderer.setStyle(
        //   this.extendGenre.nativeElement,
        //   'display',
        //   'none',
        //   RendererStyleFlags2.Important
        // )
        // console.log(this.extendGenre.nativeElement.style.display)
      }
    } else {
      await this.hideMenuExtend()
    }
  }

  private hideMenuExtend = async (): Promise<void> => {
    this.isOpenMenu = false
    this.showExtendMenu = false
    this.setIconExtend()
    await this.setClassShowExtendValue()
  }

  showExtendGenre() {}
}
