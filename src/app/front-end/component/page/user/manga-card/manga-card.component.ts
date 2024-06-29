import {
  AfterViewInit,
  Component,
  ElementRef, Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {Router} from "@angular/router";
import {AppRouter, GetImage, MiddlePrefixHandleImage} from "../../../../constant/constants";
import {Chapter, GetMangaResponseDTO, HistoryResponse} from "../../../../bkmanga-svc";
import {environment} from "../../../../../../environments/environment.development";

@Component({
  selector: 'app-manga-card',
  templateUrl: './manga-card.component.html',
  styleUrls: ['./manga-card.component.scss']
})
export class MangaCardComponent implements OnInit, AfterViewInit{

  @ViewChild('mangaCardExpand') mangaCardExpand: ElementRef
  @ViewChild('mangaCardName') mangaCardName: ElementRef
  @Input() inputData?: GetMangaResponseDTO | HistoryResponse
  @Input() removeElement: boolean = false
  manga?: GetMangaResponseDTO
  lastChapter?: Chapter

  private classShowMangaCard: string = 'manga-card__expand__show'

  offsetLeft: string = `unset`
  offsetRight: string = `unset`
  offsetTop: string = `unset`
  offsetBottom: string = `unset`

  private readonly gapHorizontal: number = 12
  private readonly gapVertical: number = 12

  constructor(
    mangaCardExpand: ElementRef,
    mangaCardName: ElementRef,
    private readonly router: Router,
  ) {
    this.mangaCardExpand = mangaCardExpand
    this.mangaCardName = mangaCardName
  }

  ngAfterViewInit(): void {
    this.bindEventMangaCardName()
  }

  ngOnInit(): void {
    if (this.isGetMangaResponseDTO(this.inputData)) {
      this.manga = this.inputData as GetMangaResponseDTO
      this.lastChapter = this.manga.chapterList?.at(0)
    } else if (this.isHistoryResponse(this.inputData)) {
      this.manga = this.inputData.getMangaResponseDTO as GetMangaResponseDTO
      this.lastChapter = this.inputData.chapter
    }
  }

  private mouseOverMangaName = (): void => {
    this.mangaCardExpand.nativeElement.classList.add(this.classShowMangaCard)
  }

  private mouseOutMangaName = (): void => {
    this.mangaCardExpand.nativeElement.classList.remove(this.classShowMangaCard)
  }

  private mouseMoveMangaName = (event: MouseEvent): void => {
    let positionElementBegin = this.mangaCardName.nativeElement.getBoundingClientRect()
    if (positionElementBegin.left <= this.getWidthScreen() / 2) {
      this.setRightMangaCardExpandPosition()
      this.setLeftMangaCardExpandPosition(event.x - positionElementBegin.left + this.gapHorizontal)
    } else {
      this.setLeftMangaCardExpandPosition()
      this.setRightMangaCardExpandPosition(positionElementBegin.right - event.x + this.gapHorizontal)
    }

    if (positionElementBegin.top <= this.getHeightScreen() / 2) {
      this.setBottomMangaCardExpandPosition()
      this.setTopMangaCardExpandPosition(event.y - positionElementBegin.top + this.gapVertical)
    } else {
      this.setTopMangaCardExpandPosition()
      this.setBottomMangaCardExpandPosition(positionElementBegin.bottom - event.y + this.gapVertical)
    }
  }

  private bindEventMangaCardName() {
    this.mangaCardName.nativeElement
      .addEventListener('mouseover', () => this.mouseOverMangaName())

    this.mangaCardName.nativeElement
      .addEventListener('mouseout', () => this.mouseOutMangaName())

    this.mangaCardName.nativeElement
      .addEventListener('mousemove', (event: MouseEvent) => {
        this.mouseMoveMangaName(event)
      })
  }

  private setLeftMangaCardExpandPosition = (offsetLeft: number | undefined = undefined): void => {

    if (offsetLeft === undefined) {
      this.offsetLeft = 'unset'
      return
    }

    this.offsetLeft = `${offsetLeft}px`
  }

  private setRightMangaCardExpandPosition = (offsetRight: number | undefined = undefined): void => {

    if (offsetRight === undefined) {
      this.offsetRight = 'unset'
      return
    }

    this.offsetRight = `${offsetRight}px`
  }

  private setTopMangaCardExpandPosition = (offsetTop: number | undefined = undefined): void => {

    if (offsetTop === undefined) {
      this.offsetTop = 'unset'
      return
    }

    this.offsetTop = `${offsetTop}px`
  }

  private setBottomMangaCardExpandPosition = (offsetBottom: number | undefined = undefined): void => {

    if (offsetBottom === undefined) {
      this.offsetBottom = 'unset'
      return
    }

    this.offsetBottom = `${offsetBottom}px`
  }

  redirectToMangaDetailPage = async () : Promise<any> => {
    if (!this.manga?.id) return

    await this.router.navigate([AppRouter.Main, AppRouter.MangaDetail, this.manga?.id])
  }

  redirectToChapterDetailPage = async (
    mangaId: number | undefined,
    chapterId: number | undefined
  ) : Promise<void> => {
    if (!chapterId || !mangaId) return

    await this.router.navigate([
      AppRouter.Main,
      AppRouter.MangaDetail,
      mangaId,
      AppRouter.ChapterDetail,
      chapterId
    ])
  }

  private getWidthScreen = (): number => window.innerWidth

  private getHeightScreen = (): number => window.innerHeight

  private isGetMangaResponseDTO = (value: any) : value is GetMangaResponseDTO => {
    return "name" in value
  }

  private isHistoryResponse = (value: any) : value is HistoryResponse => {
    return "getMangaResponseDTO" in value
  }
  protected readonly MiddlePrefixHandleImage = MiddlePrefixHandleImage;
  protected readonly GetImage = GetImage;
  protected readonly environment = environment;
}
