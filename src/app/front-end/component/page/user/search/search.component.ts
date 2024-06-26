import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DataOrderBy, RouteSearch} from "../../../../constant/constants";
import {GetMangaByNameRequestDTO, GetMangaResponseDTO, MangaControllerService} from "../../../../bkmanga-svc";
import {PageEvent} from "@angular/material/paginator";
import {StatusCodes} from "http-status-codes";
import {DialogService} from "../../../../service/dialog.service";
import {SnackbarData} from "../../../../interface/snackbar-data";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{

  searchValue: string = ""
  labelPageSearch: string

  mangaFoundList: Array<GetMangaResponseDTO> = new Array<GetMangaResponseDTO>()
  totalElementData?: number

  private page: number
  private size: number

  constructor(
    private activatedRoute: ActivatedRoute,
    private mangaControllerService: MangaControllerService,
    private dialogService: DialogService,
  ) {
    this.page = 0
    this.size = 10
    this.labelPageSearch = "label.search"
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (param) => {
      this.searchValue = param[RouteSearch.Param].trim()

      if (this.searchValue) {
        await this.getMangaBySearchName()
      }
    })
  }

  private getMangaBySearchName = async () : Promise<void> => {

    let getMangaByNameRequestDTO: GetMangaByNameRequestDTO = {
      name: this.searchValue,
      otherName: this.searchValue,
      page: this.page,
      size: this.size,
      orderBy: DataOrderBy.ASC,
    }

    this.mangaControllerService.searchMangaByName(getMangaByNameRequestDTO).subscribe(
      (response) => {
        if (response.responseCode === StatusCodes.OK) {
          this.mangaFoundList = response.result?.content ?? []
          this.totalElementData = response.result?.totalElements
        } else {
          let snackBarData: SnackbarData = {
            message: response.message ?? ""
          }

          this.dialogService.showSnackBar(snackBarData)
        }
      })
  }

  setPaginatorData = async ($event: PageEvent) : Promise<void> => {
    this.page = $event.pageIndex
    this.size = $event.pageSize
    await this.getMangaBySearchName()
  }
}
