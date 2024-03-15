import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {AppRouter} from "../../../constant/constants";
import {Router} from "@angular/router";
import {SharingService} from "../../../service/sharing.service";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit, AfterViewInit{

  iconExtend: string

  isOpenMenu: boolean

  showExtendMenu: boolean

  listGenre: Array<string> = [
    "Action",
    "Adventure",
    "Anime",
    "Chuyển",
    "Sinh",
    "Cổ Đại",
    "Comedy",
    "Comic",
    "Demons",
    "Detective",
    "Doujinshi",
    "Drama",
    "Fantasy",
    "Gender Bender",
    "Harem",
    "Historical",
    "Horror",
    "Huyền Huyễn",
    "Isekai",
    "Josei",
    "Mafia",
    "Magic",
    "Manhua",
    "Manhwa",
    "Martial",
    "Arts",
    "Military",
    "Mystery",
    "Ngôn Tình",
    "Oneshot",
    "Psychological",
    "Romance",
    "School Life",
    "Sci-fi",
    "Seinen",
    "Shoujo",
    "Shoujo Ai",
    "Shounen",
    "Shounen Ai",
    "Slice of life",
    "Sports",
    "Supernatural",
    "Tragedy",
    "Trọng Sinh",
    "Truyện Màu",
    "Webtoon",
    "Xuyên Không",
  ]

  classShowExtendValue: string = ''

  protected showNavigationBar: boolean

  constructor(
    private router: Router,
    private sharingService: SharingService
  ) {
    this.iconExtend = "menu"
    this.isOpenMenu = true
    this.showExtendMenu = true
    this.showNavigationBar = true
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
      await this.setClassShowExtendValue();
    }
  }

  async ngAfterViewInit(): Promise<void> {
    await this.onResize()
  }

  async ngOnInit(): Promise<void> {
    this.sharingService.awaitData().subscribe(result => {
      this.showNavigationBar = result
    })
  }

  public async redirectToMainPage() {
    await this.router.navigate([AppRouter.Main])
  }

  public showExtendGenre() {

  }


}
