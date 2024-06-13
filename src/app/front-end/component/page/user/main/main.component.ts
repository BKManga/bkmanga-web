import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {SharingService} from "../../../../service/sharing.service";
import {AppRouter} from "../../../../constant/constants";
import {Router} from "@angular/router";
import {
  GetMangaListByUploadChapterRequestDTO,
  GetMangaResponseDTO,
  MangaControllerService
} from "../../../../bkmanga-svc";
import {PageEvent} from "@angular/material/paginator";
import {StatusCodes} from "http-status-codes";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit{

  mangaDataList: Array<GetMangaResponseDTO> = new Array<GetMangaResponseDTO>()
  totalElementData?: number

  private page: number
  private size: number

  constructor(
    private sharingService: SharingService,
    private mangaControllerService: MangaControllerService,
    private router: Router,
  ) {
    this.page = 0
    this.size = 10
  }

  async ngOnInit(): Promise<void> {
    await this.sharingService.setShowAuthButton(true)
    await this.getMangaListOrderByLastUploadChapter()
  }

  private getMangaListOrderByLastUploadChapter = async () => {

    let getMangaListByUploadChapterRequestDTO: GetMangaListByUploadChapterRequestDTO = {
      page: this.page,
      size: this.size
    }

    this.mangaControllerService.getMangaListByLastUploadChapter(getMangaListByUploadChapterRequestDTO).subscribe(
      (response) => {
        if (response.responseCode === StatusCodes.OK) {
          this.mangaDataList = response.result?.content ?? []
          this.totalElementData = response.result?.totalElements ?? 0
        }
    })
  }

  ngAfterViewInit(): void {
  }

  redirectToFilterPage = async () : Promise<void> => {
    await this.router.navigate([AppRouter.Main, AppRouter.Filter])
  }

  setPaginatorData = async ($event: PageEvent) : Promise<void> => {
    this.page = $event.pageIndex
    this.size = $event.pageSize
    await this.getMangaListOrderByLastUploadChapter()
  }
}
