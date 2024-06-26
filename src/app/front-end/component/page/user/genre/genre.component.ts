import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {
  Genre,
  GenreControllerService,
  GetMangaByGenreRequestDTO,
  GetMangaResponseDTO,
  MangaControllerService
} from "../../../../bkmanga-svc";
import {ActivatedRoute} from "@angular/router";
import {DataOrderBy, RouteGenre} from "../../../../constant/constants";
import {parseInt} from "lodash";
import {PageEvent} from "@angular/material/paginator";
import {StatusCodes} from "http-status-codes";
import {SnackbarData} from "../../../../interface/snackbar-data";
import {DialogService} from "../../../../service/dialog.service";

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit, OnChanges{
  mangaFoundList : Array<GetMangaResponseDTO>
  private idGenre: string | undefined
  genreData: Genre | undefined

  totalElementData?: number

  private page: number
  private size: number

  constructor(
    private genreControllerService: GenreControllerService,
    private activatedRoute: ActivatedRoute,
    private mangaControllerService: MangaControllerService,
    private dialogService: DialogService,
  ) {
    this.mangaFoundList = new Array<GetMangaResponseDTO>()
    this.page = 0
    this.size = 10
  }

  async ngOnInit(): Promise<void> {
    this.activatedRoute.params.subscribe(async (param) => {
      this.idGenre = param[RouteGenre.Param]
      await this.getGenreData()
      await this.getMangaDataByGenre()
    });
  }

  private getGenreData = async () : Promise<void> => {
    if (!this.idGenre) return
    let idGenreTypeNum = parseInt(this.idGenre!)
    this.genreControllerService.getGenreById(idGenreTypeNum).subscribe(
      (response) => {
        if (response.responseCode === StatusCodes.OK) {
          this.genreData = response.result
        }
      })
  }

  private getMangaDataByGenre = async (): Promise<void> => {
    if (!this.idGenre) return

    let getMangaByGenreRequestDTO: GetMangaByGenreRequestDTO = {
      genreId: parseInt(this.idGenre!),
      page: this.page,
      size: this.size,
      orderBy: DataOrderBy.ASC
    }

    this.mangaControllerService.searchMangaByGenre(getMangaByGenreRequestDTO).subscribe(
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

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }

  setPaginatorData = async ($event: PageEvent) : Promise<void> => {
    this.page = $event.pageIndex
    this.size = $event.pageSize
    await this.getMangaDataByGenre()
  }
}
