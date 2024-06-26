import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AppRouter, CommentBlockArea, RouteChapter, RouteManga} from "../../../../constant/constants";
import {
  ChapterControllerService, CreateOrEditHistoryRequestDTO,
  GetChapterDetailRequestDTO,
  GetChapterDetailResponseDTO, HistoryControllerService
} from "../../../../bkmanga-svc";
import {StatusCodes} from "http-status-codes";
import {SnackbarData} from "../../../../interface/snackbar-data";
import {DialogService} from "../../../../service/dialog.service";
import {ScrollPageService} from "../../../../service/scroll-page.service";
import {JwtDecodeService} from "../../../../service/jwt-decode.service";

@Component({
  selector: 'app-chapter-detail',
  templateUrl: './chapter-detail.component.html',
  styleUrls: ['./chapter-detail.component.scss']
})
export class ChapterDetailComponent implements OnInit{

  listImage: Array<number> = [1, 2, 3, 4, 5]
  readonly commentBlockArea: string = CommentBlockArea.CHAPTER

  private mangaId: string
  private chapterId: string

  chapterData?: GetChapterDetailResponseDTO

  constructor(
    private activatedRoute: ActivatedRoute,
    private chapterControllerService: ChapterControllerService,
    private dialogService: DialogService,
    private historyControllerService: HistoryControllerService,
    private scrollPageService: ScrollPageService,
    private router: Router,
    private jwtDecodeService: JwtDecodeService,
  ) {
    this.mangaId = ""
    this.chapterId = ""
  }

  async ngOnInit(): Promise<void> {
    this.scrollPageService.scrollTopPage()

    this.activatedRoute.params.subscribe(async (param) => {
      this.mangaId = param[RouteManga.Param]
      this.chapterId = param[RouteChapter.Param]

      if (this.checkParamId(this.mangaId, this.chapterId)) {
        await this.getChapterData()
      }
    })
  }

  private getChapterData = async () : Promise<void> => {
    let getChapterDetailRequestDTO: GetChapterDetailRequestDTO = {
      mangaId: parseInt(this.mangaId),
      chapterId: parseInt(this.chapterId),
    }

    this.chapterControllerService.getChapterDetail(getChapterDetailRequestDTO).subscribe(
      async (response) => {
        if (response.responseCode === StatusCodes.OK) {
          this.chapterData = response.result ?? undefined

          if (this.chapterData) {
            await this.handleHistoryData()
          }
        } else {
          let snackBarData: SnackbarData = {
            message: response.message ?? ""
          }

          this.dialogService.showSnackBar(snackBarData)
        }
      })
  }

  private handleHistoryData = async (): Promise<void> => {
    if (!this.jwtDecodeService.checkToken()) return

    let createOrEditHistoryRequestDTO: CreateOrEditHistoryRequestDTO = {
      mangaId: parseInt(this.mangaId),
      chapterId: parseInt(this.chapterId),
    }

    this.historyControllerService.createOrEditHistory(createOrEditHistoryRequestDTO).subscribe(
      (response) => {
        if (response.responseCode === StatusCodes.BAD_REQUEST) {
          let snackBarData: SnackbarData = {
            message: response.message ?? ""
          }

          this.dialogService.showSnackBar(snackBarData)
        }
      }
    )
  }

  private checkParamId = (
    mangaId: string,
    chapterId: string,
  ) : boolean => {
    return !!(chapterId && mangaId && parseInt(chapterId) && parseInt(mangaId))
  }

  redirectToChapterPage = async (chapterId: number | undefined) : Promise<void> => {
    if (!chapterId) return

    this.scrollPageService.scrollTopPage()

    await this.router.navigate([
      AppRouter.Main,
      AppRouter.MangaDetail,
      this.mangaId,
      AppRouter.ChapterDetail,
      chapterId
    ])
  }

  redirectToMangaDetailPage = async (mangaId: number | undefined) : Promise<void> => {
    if (!mangaId) return

    await this.router.navigate([
      AppRouter.Main,
      AppRouter.MangaDetail,
      mangaId
    ])
  }

  redirectToMainPage = async () : Promise<void> => {
    await this.router.navigate([
      AppRouter.Main
    ])
  }
}
