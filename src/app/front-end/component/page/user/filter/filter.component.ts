import {Component, OnInit} from '@angular/core';
import {DataOrderBy, MangaStatus} from "../../../../constant/constants";
import {
  GetMangaByFilterRequestDTO,
  GetMangaResponseDTO,
  MangaControllerService
} from "../../../../bkmanga-svc";
import {PageEvent} from "@angular/material/paginator";
import {FilterData} from "../../../../interface/filter-data";
import {StatusCodes} from "http-status-codes";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  labelPageFilter: string

  mangaFoundList: Array<GetMangaResponseDTO> = new Array<GetMangaResponseDTO>()
  totalElementData?: number

  private genreApproveList: Array<number> = new Array<number>()
  private genreDenyList: Array<number> = new Array<number>()

  private mangaStatus: number
  private page: number
  private size: number
  private orderBy: string

  constructor(
    private mangaControllerService: MangaControllerService,
  ) {
    this.labelPageFilter = 'label.filter'
    this.page = 0
    this.size = 10
    this.orderBy = DataOrderBy.DESC
    this.mangaStatus = MangaStatus.IN_PROCESS
  }

  async ngOnInit(): Promise<void> {
    await this.getMangaDataByFilter()
  }

  private getMangaDataByFilter = async (): Promise<void> => {

    let getMangaByFilterRequestDTO: GetMangaByFilterRequestDTO = {
      genreApproveList: this.genreApproveList,
      genreDenyList: this.genreDenyList,
      mangaStatus: this.mangaStatus,
      page: this.page,
      size: this.size,
      orderBy: this.orderBy
    }

    this.mangaControllerService.searchMangaByFilter(getMangaByFilterRequestDTO).subscribe(
      (response) => {
        if (response.responseCode === StatusCodes.OK) {
          this.mangaFoundList = response.result?.content ?? []
          this.totalElementData = response.result?.totalElements
        }
    })
  }

  setFilterData = async ($event: FilterData): Promise<void> => {
    this.genreApproveList = $event.listChooseGenres
    this.genreDenyList = $event.listExceptGenres
    this.mangaStatus = $event.mangaStatus
    this.orderBy = $event.orderManga

    this.resetPaginatorData()

    await this.getMangaDataByFilter()
  }

  private resetPaginatorData = () => {
    this.page = 0
    this.size = 10
  }

  setPaginatorData = async ($event: PageEvent) : Promise<void> => {
    this.page = $event.pageIndex
    this.size = $event.pageSize

    await this.getMangaDataByFilter()
  }
}
