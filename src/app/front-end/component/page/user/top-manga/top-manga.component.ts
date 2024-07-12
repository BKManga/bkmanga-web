import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {GetMangaTopResponseDTO, MangaControllerService} from "../../../../bkmanga-svc";
import {StatusCodes} from "http-status-codes";
import {environment} from "../../../../../../environments/environment";
import {AppRouter, GetImage, MiddlePrefixHandleImage} from "../../../../constant/constants";
import {Router} from "@angular/router";

@Component({
  selector: 'app-top-manga',
  templateUrl: './top-manga.component.html',
  styleUrls: ['./top-manga.component.scss']
})
export class TopMangaComponent implements OnInit, AfterViewInit{

  protected heightMangaTop: string = '0'

  @ViewChild('top_manga')
  protected topMangaElement: ElementRef

  topMangaList: Array<GetMangaTopResponseDTO> = []

  urlImage: string

  constructor(
    topMangaElement: ElementRef,
    private mangaControllerService: MangaControllerService,
    private router: Router,
  ) {
    this.topMangaElement = topMangaElement
    this.urlImage = environment.apiBaseUrl + MiddlePrefixHandleImage.Prefix + GetImage.MANGA_IMAGE_LARGE
  }

  @HostListener('window:resize', ['$event'])
  async onResize() {
    this.heightMangaTop = `${this.topMangaElement.nativeElement.offsetWidth / 3}px`
  }

  async ngAfterViewInit(): Promise<void> {
    await this.onResize()
  }

  async ngOnInit(): Promise<void> {
    await this.getTopManga()
  }

  private getTopManga = async (): Promise<void> => {
    this.mangaControllerService.getTopManga().subscribe(
      (response) => {
        if (response.responseCode === StatusCodes.OK) {
          this.topMangaList = response.result ?? []
        }
    })
  }

  redirectToChapterDetail = async (mangaId?: number, chapterId?: number): Promise<void> => {
    if (!chapterId || !mangaId) return

    await this.router.navigate([
      AppRouter.Main,
      AppRouter.MangaDetail,
      mangaId,
      AppRouter.ChapterDetail,
      chapterId
    ])
  }
}
